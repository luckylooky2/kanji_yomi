import dayjs from "dayjs";

import { getTotalSeconds, timeFormattingFn } from "@/entities/quizResult/lib";

const 기준시간 = dayjs(new Date("2022-01-01 00:00:00"));
const diff_1m = dayjs(new Date("2022-01-01 00:01:00"));
const diff_1h = dayjs(new Date("2022-01-01 01:00:00"));
const diff_59s = dayjs(new Date("2022-01-01 00:00:59"));
const diff_0s = dayjs(new Date("2022-01-01 00:00:00"));
const diff_1s = dayjs(new Date("2022-01-01 00:00:01"));
const diff_1d = dayjs(new Date("2022-01-02 00:00:00"));
const diff_minus_1m = dayjs(new Date("2021-12-31 23:59:00"));
const 기준시간2 = dayjs(new Date("2022-01-01 02:05:25"));
const 종료시간2 = dayjs(new Date("2022-01-01 02:16:01"));

describe("validateSpeakSetting", () => {
  it("0초 차이", () => {
    const result = getTotalSeconds(기준시간, diff_0s);
    expect(result).toEqual(0);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:00");
  });

  it("1초 차이", () => {
    const result = getTotalSeconds(기준시간, diff_1s);
    expect(result).toEqual(1);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:01");
  });

  it("59초 차이", () => {
    const result = getTotalSeconds(기준시간, diff_59s);
    expect(result).toEqual(59);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:59");
  });

  it("1분 차이", () => {
    const result = getTotalSeconds(기준시간, diff_1m);
    expect(result).toEqual(60);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("1:00");
  });

  it("1시간 차이", () => {
    const result = getTotalSeconds(기준시간, diff_1h);
    expect(result).toEqual(3600);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("60:00");
  });

  it("1일 차이", () => {
    const result = getTotalSeconds(기준시간, diff_1d);
    expect(result).toEqual(86400);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("1440:00");
  });

  it("-1분 차이", () => {
    const result = getTotalSeconds(기준시간, diff_minus_1m);
    expect(result).toEqual(0);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:00");
  });

  it("랜덤 값", () => {
    const result = getTotalSeconds(기준시간2, 종료시간2);
    expect(result).toEqual(636);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("10:36");
  });

  it("두 인자가 모두 null", () => {
    const result = getTotalSeconds(null, null);
    expect(result).toEqual(0);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:00");
  });

  it("첫 번째 인자가 null", () => {
    const result = getTotalSeconds(기준시간, null);
    expect(result).toEqual(0);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:00");
  });

  it("두 번째 인자가 null", () => {
    const result = getTotalSeconds(null, 기준시간);
    expect(result).toEqual(0);
    const result2 = timeFormattingFn(result);
    expect(result2).toEqual("0:00");
  });
});
