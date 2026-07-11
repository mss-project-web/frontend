#!/usr/bin/env node

/**
 * Memory Usage Monitor for MSS Frontend
 * ตรวจสอบ Memory Usage ในโหมด Production
 */

const { performance, PerformanceObserver } = require('perf_hooks');

class MemoryMonitor {
  constructor() {
    this.memorySnapshots = [];
    this.startTime = Date.now();
    this.isMonitoring = false;
  }

  start() {
    if (this.isMonitoring) {
      console.log('🔍 Memory Monitor กำลังทำงานอยู่แล้ว');
      return;
    }

    this.isMonitoring = true;
    console.log('🚀 เริ่มต้น Memory Monitor...');
    
    // ตรวจสอบ Memory ทุก 5 วินาที
    this.monitorInterval = setInterval(() => {
      this.collectMemorySnapshot();
    }, 5000);

    // ตรวจสอบ Performance
    this.setupPerformanceObserver();
    
    // แสดงผลเริ่มต้น
    this.displayInitialStats();
  }

  stop() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    clearInterval(this.monitorInterval);
    
    console.log('\n📊 สรุปผล Memory Usage:');
    this.generateReport();
  }

  collectMemorySnapshot() {
    const memUsage = process.memoryUsage();
    const timestamp = Date.now() - this.startTime;
    
    const snapshot = {
      timestamp,
      rss: memUsage.rss,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      arrayBuffers: memUsage.arrayBuffers
    };
    
    this.memorySnapshots.push(snapshot);
    this.displayCurrentMemory(snapshot);
  }

  displayCurrentMemory(snapshot) {
    const formatBytes = (bytes) => {
      const mb = bytes / 1024 / 1024;
      return `${mb.toFixed(2)} MB`;
    };

    console.log(`⏱️  ${(snapshot.timestamp / 1000).toFixed(1)}s | ` +
                `RSS: ${formatBytes(snapshot.rss)} | ` +
                `Heap: ${formatBytes(snapshot.heapUsed)}/${formatBytes(snapshot.heapTotal)} | ` +
                `External: ${formatBytes(snapshot.external)}`);
  }

  displayInitialStats() {
    console.log('\n📈 Node.js Memory Stats:');
    console.log(`Platform: ${process.platform}`);
    console.log(`Node Version: ${process.version}`);
    console.log(`CPU Architecture: ${process.arch}`);
    
    if (global.gc) {
      console.log('🗑️  Garbage Collection: Enabled');
    } else {
      console.log('⚠️  Garbage Collection: Disabled (รัน --expose-gc เพื่อเปิดใช้งาน)');
    }
  }

  setupPerformanceObserver() {
    const obs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'gc') {
          console.log(`🗑️  GC: ${entry.kind} - Duration: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    try {
      obs.observe({ entryTypes: ['gc'] });
    } catch (err) {
      // GC observing ไม่สามารถใช้ได้ในบาง environment
    }
  }

  generateReport() {
    if (this.memorySnapshots.length === 0) return;

    const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    
    const initial = this.memorySnapshots[0];
    const final = this.memorySnapshots[this.memorySnapshots.length - 1];
    
    console.log('\n📋 รายงาน Memory Usage:');
    console.log('================================');
    console.log(`⏱️  ระยะเวลาการตรวจสอบ: ${(final.timestamp / 1000).toFixed(1)} วินาที`);
    console.log(`📊 จำนวน Snapshots: ${this.memorySnapshots.length}`);
    
    console.log('\n🔄 การเปลี่ยนแปลง Memory:');
    console.log(`RSS: ${formatBytes(initial.rss)} → ${formatBytes(final.rss)} (${formatBytes(final.rss - initial.rss)})`);
    console.log(`Heap Used: ${formatBytes(initial.heapUsed)} → ${formatBytes(final.heapUsed)} (${formatBytes(final.heapUsed - initial.heapUsed)})`);
    console.log(`External: ${formatBytes(initial.external)} → ${formatBytes(final.external)} (${formatBytes(final.external - initial.external)})`);
    
    // หา Peak Memory Usage
    const peakRSS = Math.max(...this.memorySnapshots.map(s => s.rss));
    const peakHeap = Math.max(...this.memorySnapshots.map(s => s.heapUsed));
    
    console.log('\n📈 Peak Memory Usage:');
    console.log(`RSS Peak: ${formatBytes(peakRSS)}`);
    console.log(`Heap Peak: ${formatBytes(peakHeap)}`);
    
    // ตรวจสอบ Memory Leaks
    this.detectMemoryLeaks();
  }

  detectMemoryLeaks() {
    if (this.memorySnapshots.length < 3) return;
    
    const recentSnapshots = this.memorySnapshots.slice(-5);
    const memoryTrend = recentSnapshots.map(s => s.heapUsed);
    
    let increasing = 0;
    for (let i = 1; i < memoryTrend.length; i++) {
      if (memoryTrend[i] > memoryTrend[i-1]) {
        increasing++;
      }
    }
    
    console.log('\n🔍 การวิเคราะห์ Memory Leaks:');
    if (increasing >= memoryTrend.length - 2) {
      console.log('⚠️  อาจมี Memory Leak - Memory เพิ่มขึ้นอย่างต่อเนื่อง');
      console.log('💡 แนะนำ: ตรวจสอบ event listeners, timers, และ closures');
    } else {
      console.log('✅ ไม่พบสัญญาณของ Memory Leak');
    }
  }

  // Force Garbage Collection (ถ้าเปิดใช้งาน)
  forceGC() {
    if (global.gc) {
      console.log('🗑️  กำลังเรียก Garbage Collection...');
      global.gc();
      console.log('✅ Garbage Collection เสร็จสิ้น');
    } else {
      console.log('⚠️  ไม่สามารถเรียก Garbage Collection ได้ (รัน --expose-gc)');
    }
  }
}

// CLI Interface
if (require.main === module) {
  const monitor = new MemoryMonitor();
  
  console.log('🔍 MSS Frontend Memory Monitor');
  console.log('================================');
  console.log('กด Ctrl+C เพื่อหยุดและดูรายงาน\n');
  
  monitor.start();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 กำลังหยุด Memory Monitor...');
    monitor.stop();
    process.exit(0);
  });
  
  // เรียก GC ทุก 30 วินาที
  setInterval(() => {
    monitor.forceGC();
  }, 30000);
}

module.exports = MemoryMonitor;
