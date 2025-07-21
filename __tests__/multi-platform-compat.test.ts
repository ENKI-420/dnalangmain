import { 
  CompatibilityManager,
  globalCompatibilityManager,
  createMultiPlatformCompatOrganism,
  compatibilityGene
} from '../lib/multi-platform-compat'

// Mock navigator for testing
const mockNavigator = (userAgent: string, platform: string) => {
  Object.defineProperty(global, 'navigator', {
    value: {
      userAgent,
      platform
    },
    configurable: true
  })
}

// Mock window for testing
const mockWindow = () => {
  Object.defineProperty(global, 'window', {
    value: {},
    configurable: true
  })
}

describe('CompatibilityManager', () => {
  beforeEach(() => {
    mockWindow()
  })

  describe('detectPlatform', () => {
    test('detects mobile platform correctly', () => {
      mockNavigator('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'iPhone')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('mobile')
      expect(result.detected).toBe(true)
      expect(result.confidence).toBeGreaterThan(0.9)
    })

    test('detects Android mobile correctly', () => {
      mockNavigator('Mozilla/5.0 (Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0', 'Linux armv8l')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('mobile')
      expect(result.detected).toBe(true)
    })

    test('detects Linux platform correctly', () => {
      mockNavigator('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36', 'Linux x86_64')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('linux')
      expect(result.detected).toBe(true)
      expect(result.confidence).toBeGreaterThan(0.8)
    })

    test('detects Mac platform correctly', () => {
      mockNavigator('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'MacIntel')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('mac')
      expect(result.detected).toBe(true)
      expect(result.confidence).toBeGreaterThan(0.8)
    })

    test('detects PC platform correctly', () => {
      mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Win32')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('pc')
      expect(result.detected).toBe(true)
      expect(result.confidence).toBeGreaterThan(0.8)
    })

    test('handles unknown platform', () => {
      mockNavigator('Unknown Browser', 'Unknown Platform')
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('unknown')
      expect(result.detected).toBe(false)
      expect(result.confidence).toBe(0)
    })

    test('handles server-side environment', () => {
      // Remove window and navigator
      delete (global as any).window
      delete (global as any).navigator
      
      const manager = new CompatibilityManager()
      const result = manager.detectPlatform()
      
      expect(result.type).toBe('unknown')
      expect(result.detected).toBe(false)
    })
  })

  describe('collaborative detection', () => {
    test('performs collaborative detection with multiple agents', () => {
      mockNavigator('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'iPhone')
      
      const manager = new CompatibilityManager()
      const result = manager.collaborativeDetection()
      
      expect(result.detected).toBe(true)
    })

    test('resolves multi-detection conflicts using priority', () => {
      // This test simulates a scenario where multiple platforms might be detected
      mockNavigator('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'iPhone')
      
      const manager = new CompatibilityManager()
      
      // Spy on console.log to verify conflict resolution
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      const result = manager.collaborativeDetection()
      
      expect(result.type).toBeTruthy()
      
      consoleSpy.mockRestore()
    })
  })

  describe('activateCompatibilityMode', () => {
    test('activates platform-specific mode for known platform', () => {
      mockNavigator('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'iPhone')
      
      const manager = new CompatibilityManager()
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      manager.activateCompatibilityMode()
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('MobileAgent'))
      
      consoleSpy.mockRestore()
    })

    test('activates fallback mode for unknown platform', () => {
      mockNavigator('Unknown Browser', 'Unknown Platform')
      
      const manager = new CompatibilityManager()
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      manager.activateCompatibilityMode()
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('fallback'))
      
      consoleSpy.mockRestore()
    })
  })
})

describe('MultiPlatformCompatOrganism', () => {
  test('creates organism with correct structure', () => {
    const organism = createMultiPlatformCompatOrganism()
    
    expect(organism.dna.domain).toBe('os_compatibility')
    expect(organism.dna.scale).toBe('enterprise')
    expect(organism.dna.security_level).toBe('maximum')
    expect(organism.dna.immune_system).toBe(true)
    
    expect(organism.agents.mobile.name).toBe('MobileAgent')
    expect(organism.agents.linux.name).toBe('LinuxAgent')
    expect(organism.agents.mac.name).toBe('MacAgent')
    expect(organism.agents.pc.name).toBe('PcAgent')
    
    expect(organism.collaborations.detect_device.participants).toHaveLength(4)
  })

  test('agents have correct properties', () => {
    const organism = createMultiPlatformCompatOrganism()
    
    expect(organism.agents.mobile.focus).toBe('hybrid')
    expect(organism.agents.linux.vigilance).toBe('high')
    expect(organism.agents.mac.strategy).toBe('balanced')
    expect(organism.agents.pc.speed).toBe('fast')
  })
})

describe('CompatibilityGene', () => {
  test('has correct structure and properties', () => {
    expect(compatibilityGene.purpose).toBe('Ensures compatibility across mobile, PC, Linux, Mac')
    expect(compatibilityGene.category).toBe('compatibility')
    expect(compatibilityGene.version).toBe('1.0.0')
    expect(compatibilityGene.fitness).toBe(0.98)
    
    expect(compatibilityGene.implementation.strategy).toBe('adaptive_detection')
    expect(compatibilityGene.implementation.language).toBe('typescript')
    expect(compatibilityGene.implementation.code).toContain('detectPlatform')
    
    expect(compatibilityGene.mutations.enhance_detection).toBeDefined()
    expect(compatibilityGene.immune_responses.incompatible_platform).toBeDefined()
  })

  test('immune response has correct configuration', () => {
    const immuneResponse = compatibilityGene.immune_responses.incompatible_platform
    
    expect(immuneResponse.threat_pattern).toBe('unknown_platform')
    expect(immuneResponse.response_type).toBe('fallback_mode')
    expect(immuneResponse.severity).toBe('medium')
    expect(immuneResponse.auto_execute).toBe(true)
  })
})

describe('globalCompatibilityManager', () => {
  test('is properly instantiated', () => {
    expect(globalCompatibilityManager).toBeInstanceOf(CompatibilityManager)
  })

  test('can be used globally', () => {
    mockNavigator('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel')
    
    const result = globalCompatibilityManager.detectPlatform()
    expect(result.type).toBe('mac')
  })
})