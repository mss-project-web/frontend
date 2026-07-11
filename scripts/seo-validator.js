#!/usr/bin/env node

/**
 * SEO Validator for MSS Frontend
 * ตรวจสอบ SEO Implementation และ Structured Data
 */

const fs = require('fs');
const path = require('path');

class SEOValidator {
  constructor() {
    this.results = {
      pages: [],
      structuredData: [],
      metadata: [],
      issues: [],
      warnings: []
    };
    
    this.requiredMetaTags = [
      'title',
      'description',
      'keywords',
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'twitter:card',
      'twitter:title',
      'twitter:description'
    ];
  }

  async validateProject() {
    console.log('🔍 เริ่มตรวจสอบ SEO Implementation...\n');
    
    await this.scanPages();
    await this.validateStructuredData();
    await this.checkMetadata();
    await this.validateBuildOutput();
    
    this.generateReport();
  }

  async scanPages() {
    console.log('📄 ตรวจสอบหน้าเว็บ...');
    
    const appDir = path.join(process.cwd(), 'src', 'app');
    const pages = this.findPageFiles(appDir);
    
    for (const pagePath of pages) {
      await this.validatePage(pagePath);
    }
    
    console.log(`✅ ตรวจสอบ ${pages.length} หน้าเว็บเสร็จสิ้น\n`);
  }

  findPageFiles(dir, pages = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.findPageFiles(filePath, pages);
      } else if (file === 'page.tsx' || file === 'layout.tsx') {
        pages.push(filePath);
      }
    }
    
    return pages;
  }

  async validatePage(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const pageResult = {
      file: relativePath,
      hasH1: false,
      hasStructuredData: false,
      hasMetadata: false,
      semanticHTML: false,
      issues: []
    };

    // ตรวจสอบ H1 tag
    const h1Matches = content.match(/<h1[^>]*>/gi);
    if (h1Matches && h1Matches.length > 0) {
      pageResult.hasH1 = true;
      if (h1Matches.length > 1) {
        pageResult.issues.push('พบ H1 tag มากกว่า 1 tag');
      }
    } else if (filePath.includes('page.tsx')) {
      pageResult.issues.push('ไม่พบ H1 tag');
    }

    // ตรวจสอบ Structured Data
    if (content.includes('StructuredData') || content.includes('application/ld+json')) {
      pageResult.hasStructuredData = true;
    }

    // ตรวจสอบ Metadata (layout.tsx)
    if (filePath.includes('layout.tsx')) {
      if (content.includes('generateMetadata') || content.includes('metadata')) {
        pageResult.hasMetadata = true;
      } else {
        pageResult.issues.push('ไม่พบ metadata configuration');
      }
    }

    // ตรวจสอบ Semantic HTML
    const semanticTags = ['header', 'main', 'section', 'article', 'nav', 'aside', 'footer'];
    const hasSemanticTags = semanticTags.some(tag => 
      content.includes(`<${tag}`) || content.includes(`<${tag}>`)
    );
    pageResult.semanticHTML = hasSemanticTags;

    this.results.pages.push(pageResult);
  }

  async validateStructuredData() {
    console.log('🏗️  ตรวจสอบ Structured Data Components...');
    
    const structuredDataDir = path.join(process.cwd(), 'src', 'components');
    const structuredDataFiles = this.findStructuredDataFiles(structuredDataDir);
    
    for (const filePath of structuredDataFiles) {
      await this.validateStructuredDataFile(filePath);
    }
    
    console.log(`✅ ตรวจสอบ ${structuredDataFiles.length} structured data components เสร็จสิ้น\n`);
  }

  findStructuredDataFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    
    const dirFiles = fs.readdirSync(dir);
    
    for (const file of dirFiles) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.findStructuredDataFiles(filePath, files);
      } else if (file.includes('StructuredData') && file.endsWith('.tsx')) {
        files.push(filePath);
      }
    }
    
    return files;
  }

  async validateStructuredDataFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const result = {
      file: relativePath,
      hasValidSchema: false,
      schemaTypes: [],
      issues: []
    };

    // ตรวจสอบ Schema.org types
    const schemaMatches = content.match(/"@type":\s*"([^"]+)"/g);
    if (schemaMatches) {
      result.hasValidSchema = true;
      result.schemaTypes = schemaMatches.map(match => 
        match.match(/"@type":\s*"([^"]+)"/)[1]
      );
    } else {
      result.issues.push('ไม่พบ valid Schema.org @type');
    }

    // ตรวจสอบ required properties
    const requiredProps = ['@context', '@type', 'name'];
    for (const prop of requiredProps) {
      if (!content.includes(`"${prop}"`)) {
        result.issues.push(`ไม่พบ required property: ${prop}`);
      }
    }

    this.results.structuredData.push(result);
  }

  async checkMetadata() {
    console.log('🏷️  ตรวจสอบ Metadata Configuration...');
    
    // ตรวจสอบ root layout
    const rootLayoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx');
    if (fs.existsSync(rootLayoutPath)) {
      await this.validateMetadataFile(rootLayoutPath);
    }
    
    console.log('✅ ตรวจสอบ metadata เสร็จสิ้น\n');
  }

  async validateMetadataFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const result = {
      file: relativePath,
      hasBasicMeta: false,
      hasOpenGraph: false,
      hasTwitterCard: false,
      hasSitemap: false,
      hasRobots: false,
      issues: []
    };

    // ตรวจสอบ basic metadata
    if (content.includes('title') && content.includes('description')) {
      result.hasBasicMeta = true;
    } else {
      result.issues.push('ไม่พบ basic title หรือ description');
    }

    // ตรวจสอบ Open Graph
    if (content.includes('openGraph')) {
      result.hasOpenGraph = true;
    } else {
      result.issues.push('ไม่พบ Open Graph configuration');
    }

    // ตรวจสอบ Twitter Card
    if (content.includes('twitter')) {
      result.hasTwitterCard = true;
    } else {
      result.issues.push('ไม่พบ Twitter Card configuration');
    }

    this.results.metadata.push(result);
  }

  async validateBuildOutput() {
    console.log('🏗️  ตรวจสอบ Build Output...');
    
    const buildDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(buildDir)) {
      this.results.warnings.push('ไม่พบ .next directory - กรุณา run npm run build ก่อน');
      return;
    }

    // ตรวจสอบ static generation
    const staticDir = path.join(buildDir, 'static');
    if (fs.existsSync(staticDir)) {
      console.log('✅ Static files generated successfully');
    }

    console.log('✅ ตรวจสอบ build output เสร็จสิ้น\n');
  }

  generateReport() {
    console.log('📊 รายงาน SEO Validation');
    console.log('='.repeat(50));
    
    // สรุปผลรวม
    const totalPages = this.results.pages.length;
    const pagesWithH1 = this.results.pages.filter(p => p.hasH1).length;
    const pagesWithStructuredData = this.results.pages.filter(p => p.hasStructuredData).length;
    const pagesWithSemantic = this.results.pages.filter(p => p.semanticHTML).length;
    
    console.log('\n📈 สรุปผลการตรวจสอบ:');
    console.log(`📄 จำนวนหน้าทั้งหมด: ${totalPages}`);
    console.log(`✅ หน้าที่มี H1 tag: ${pagesWithH1}/${totalPages} (${((pagesWithH1/totalPages)*100).toFixed(1)}%)`);
    console.log(`🏗️  หน้าที่มี Structured Data: ${pagesWithStructuredData}/${totalPages} (${((pagesWithStructuredData/totalPages)*100).toFixed(1)}%)`);
    console.log(`🏷️  หน้าที่ใช้ Semantic HTML: ${pagesWithSemantic}/${totalPages} (${((pagesWithSemantic/totalPages)*100).toFixed(1)}%)`);
    
    // รายละเอียดแต่ละหน้า
    console.log('\n📄 รายละเอียดแต่ละหน้า:');
    for (const page of this.results.pages) {
      console.log(`\n📁 ${page.file}`);
      console.log(`   H1 Tag: ${page.hasH1 ? '✅' : '❌'}`);
      console.log(`   Structured Data: ${page.hasStructuredData ? '✅' : '❌'}`);
      console.log(`   Semantic HTML: ${page.semanticHTML ? '✅' : '❌'}`);
      
      if (page.issues.length > 0) {
        console.log(`   ⚠️  ปัญหา: ${page.issues.join(', ')}`);
      }
    }
    
    // Structured Data Components
    if (this.results.structuredData.length > 0) {
      console.log('\n🏗️  Structured Data Components:');
      for (const data of this.results.structuredData) {
        console.log(`\n📁 ${data.file}`);
        console.log(`   Valid Schema: ${data.hasValidSchema ? '✅' : '❌'}`);
        if (data.schemaTypes.length > 0) {
          console.log(`   Schema Types: ${data.schemaTypes.join(', ')}`);
        }
        if (data.issues.length > 0) {
          console.log(`   ⚠️  ปัญหา: ${data.issues.join(', ')}`);
        }
      }
    }
    
    // คำแนะนำการปรับปรุง
    console.log('\n💡 คำแนะนำการปรับปรุง:');
    
    if (pagesWithH1 < totalPages) {
      console.log('🔸 เพิ่ม H1 tag ในหน้าที่ยังไม่มี');
    }
    
    if (pagesWithStructuredData < totalPages) {
      console.log('🔸 เพิ่ม Structured Data ในหน้าที่ยังไม่มี');
    }
    
    if (pagesWithSemantic < totalPages) {
      console.log('🔸 ใช้ Semantic HTML tags (header, main, section, etc.)');
    }
    
    console.log('🔸 ทดสอบ Rich Snippets ด้วย Google Rich Results Test');
    console.log('🔸 ตรวจสอบ Core Web Vitals');
    console.log('🔸 เพิ่ม canonical URLs');
    
    // คะแนน SEO
    const seoScore = this.calculateSEOScore();
    console.log(`\n🏆 คะแนน SEO: ${seoScore}/100`);
    
    if (seoScore >= 90) {
      console.log('🎉 ยอดเยี่ยม! SEO implementation ครบถ้วน');
    } else if (seoScore >= 70) {
      console.log('👍 ดี! ยังมีจุดที่ปรับปรุงได้');
    } else {
      console.log('⚠️  ต้องปรับปรุง SEO ให้ดีขึ้น');
    }
  }

  calculateSEOScore() {
    const totalPages = this.results.pages.length;
    if (totalPages === 0) return 0;
    
    const pagesWithH1 = this.results.pages.filter(p => p.hasH1).length;
    const pagesWithStructuredData = this.results.pages.filter(p => p.hasStructuredData).length;
    const pagesWithSemantic = this.results.pages.filter(p => p.semanticHTML).length;
    
    const h1Score = (pagesWithH1 / totalPages) * 30;
    const structuredDataScore = (pagesWithStructuredData / totalPages) * 40;
    const semanticScore = (pagesWithSemantic / totalPages) * 30;
    
    return Math.round(h1Score + structuredDataScore + semanticScore);
  }
}

// CLI Interface
if (require.main === module) {
  const validator = new SEOValidator();
  validator.validateProject().catch(console.error);
}

module.exports = SEOValidator;
