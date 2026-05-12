import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Performance')
@Controller()
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  // ── Read endpoints (public / any authenticated user) ──────────────────

  @Get('accuracy-abacus/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  getAccuracyAbacus(@Param('level') level: string) {
    return this.performanceService.getDataByLevel('accuracy_abacus', level);
  }

  @Get('accuracy-mentally/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  getAccuracyMentally(@Param('level') level: string) {
    return this.performanceService.getDataByLevel('accuracy_mentally', level);
  }

  @Get('speed/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  getSpeed(@Param('level') level: string) {
    return this.performanceService.getDataByLevel('speed', level);
  }

  // Returns all available level keys for a given type
  @Get('performance-levels/:type')
  @ApiParam({ name: 'type', example: 'accuracy_abacus' })
  getLevels(@Param('type') type: string) {
    return this.performanceService.getAllLevels(type);
  }

  // ── Write endpoints (admin only) ──────────────────────────────────────

  @Put('accuracy-abacus/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateAccuracyAbacus(@Param('level') level: string, @Body() body: Record<string, any>) {
    return this.performanceService.updateLevelData('accuracy_abacus', level, body);
  }

  @Put('accuracy-mentally/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateAccuracyMentally(@Param('level') level: string, @Body() body: Record<string, any>) {
    return this.performanceService.updateLevelData('accuracy_mentally', level, body);
  }

  @Put('speed/:level')
  @ApiParam({ name: 'level', example: 'level1' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateSpeed(@Param('level') level: string, @Body() body: Record<string, any>) {
    return this.performanceService.updateLevelData('speed', level, body);
  }
}
