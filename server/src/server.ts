import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import convertHoursStringToMinutes from "./utils/convert-hours-string-to-minutes";
import convertMinutesToHourString from "./utils/convert-minutes-to-hour-string";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays.join(","),
      yearsPlaying: body.yearsPlaying,
    },
  });

  res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
      hourStart: convertMinutesToHourString(ad.hourStart),
    }))
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adID = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adID,
    },
  });

  res.json({
    discord: ad.discord,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
