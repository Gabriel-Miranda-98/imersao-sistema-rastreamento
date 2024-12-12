import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}
  async processRoute(dto: { route_id: string; lat: number; lng: number }) {
    const routeDriver = await this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: { id: dto.route_id },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });

    return routeDriver;
  }
}