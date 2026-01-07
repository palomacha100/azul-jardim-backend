import { Module } from "@nestjs/common";
import { GameModule } from "./game/infra/nest/game.module";

@Module({
  imports: [GameModule],
})
export class AppModule {}
