import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import accuracyAbacusData from './data/accuracy_abacus';
import accuracyMentallyData from './data/accuracy_mentally';
import speedData from './data/speed';

// Deep-clone static data so the in-memory store is independently mutable
const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

@Injectable()
export class PerformanceService {
  private sources: Record<string, Record<string, any>> = {
    accuracy_abacus: deepClone(accuracyAbacusData),
    accuracy_mentally: deepClone(accuracyMentallyData),
    speed: deepClone(speedData),
  };

  private validType(type: string): boolean {
    return type in this.sources;
  }

  getDataByLevel(type: string, level: string) {
    if (!this.validType(type))
      throw new NotFoundException(`Unknown type: ${type}`);
    const source = this.sources[type];
    const levelKey = level.toLowerCase();
    const data = source[levelKey];
    if (!data)
      throw new NotFoundException(`No data found for ${type} at ${level}`);
    return { level: levelKey, data };
  }

  updateLevelData(type: string, level: string, newData: Record<string, any>) {
    if (!this.validType(type))
      throw new NotFoundException(`Unknown type: ${type}`);
    if (typeof newData !== 'object' || Array.isArray(newData))
      throw new BadRequestException('Data must be a plain object');
    const levelKey = level.toLowerCase();
    this.sources[type][levelKey] = newData;
    return { level: levelKey, data: this.sources[type][levelKey] };
  }

  getAllLevels(type: string): string[] {
    if (!this.validType(type))
      throw new NotFoundException(`Unknown type: ${type}`);
    return Object.keys(this.sources[type]);
  }
}
