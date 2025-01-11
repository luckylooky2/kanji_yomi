import {
  defaultSpeakSetting as defaultSetting,
  validateSpeakSetting,
  validateSpeakSettingAtom,
} from "../src/entities/quiz/lib/index";

const woselectedVoice = {
  lang: "ja-JP",
  rate: 0.5,
  pitch: 1,
  volume: 1,
};

const woLang = {
  selectedVoice: "",
  rate: 0.5,
  pitch: 1,
  volume: 1,
};

const woRate = {
  selectedVoice: "",
  lang: "ja-JP",
  pitch: 1,
  volume: 1,
};

const woPitch = {
  selectedVoice: "",
  lang: "ja-JP",
  rate: 0.5,
  volume: 1,
};

const woVolume = {
  selectedVoice: "",
  lang: "ja-JP",
  rate: 0.5,
  pitch: 1,
};

// 런타임에 localStorage로 입력한 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
// - localStorage에서 값을 변경할 때, jotai가 atom을 업데이트 하는 양방향 바인딩으로 발생하는 문제?
const invalidLangValue = { ...defaultSetting, lang: "ko-KR" };
const invalidRateValue = { ...defaultSetting, rate: 11 };
const invalidPitchValue = { ...defaultSetting, pitch: 3 };
const invalidVolumeValue = { ...defaultSetting, volume: 2 };
const addedProperty = { ...defaultSetting, added: "added" };
const invalidLangProperty = { ...defaultSetting, lan: 1 };
const invalidRateValueProperty = { ...defaultSetting, rat: 1 };
const invalidPitchValueProperty = { ...defaultSetting, pitc: 1 };
const invalidVolumeValueProperty = { ...defaultSetting, volum: 1 };
const invalidLangType = { ...defaultSetting, lang: 1 };
const invalidRateType = { ...defaultSetting, rate: "a" };
const invalidPitchType = { ...defaultSetting, pitch: "a" };
const invalidVolumeType = { ...defaultSetting, volume: "a" };
const emptyObject = {};
const nullValue = null;
const undefinedValue = undefined;
const numberValue = 1;

const validSetting1 = {
  selectedVoice: "",
  lang: "ja-JP",
  rate: 0.5,
  pitch: 1,
  volume: 1,
};

const validSetting2 = {
  selectedVoice: "O-Ren",
  lang: "ja-JP",
  rate: 0.3,
  pitch: 1.5,
  volume: 0.3,
};

const validSetting3 = {
  selectedVoice: "Hattori",
  lang: "ja-JP",
  rate: 0.5,
  pitch: 0,
  volume: 0,
};

describe("validateSpeakSetting", () => {
  it("selectedVoice 프로퍼티가 없을 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(woselectedVoice);
    expect(result).toEqual(false);
  });

  it("lang 프로퍼티가 없을 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(woLang);
    expect(result).toEqual(false);
  });

  it("rate 프로퍼티가 없을 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(woRate);
    expect(result).toEqual(false);
  });

  it("pitch 프로퍼티가 없을 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(woPitch);
    expect(result).toEqual(false);
  });

  it("volume 프로퍼티가 없을 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(woVolume);
    expect(result).toEqual(false);
  });

  it("lang의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSetting(invalidLangValue);
    expect(result).toEqual(false);
  });

  it("rate의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSetting(invalidRateValue);
    expect(result).toEqual(false);
  });

  it("pitch의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSetting(invalidPitchValue);
    expect(result).toEqual(false);
  });

  it("volume의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSetting(invalidVolumeValue);
    expect(result).toEqual(false);
  });

  it("프로퍼티가 추가된 경우", () => {
    const result = validateSpeakSetting(addedProperty);
    expect(result).toEqual(false);
  });

  it("lang 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSetting(invalidLangProperty);
    expect(result).toEqual(false);
  });

  it("rate 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSetting(invalidRateValueProperty);
    expect(result).toEqual(false);
  });

  it("pitch 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSetting(invalidPitchValueProperty);
    expect(result).toEqual(false);
  });

  it("volume 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSetting(invalidVolumeValueProperty);
    expect(result).toEqual(false);
  });

  it("lang 프로퍼티 타입이 다른 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(invalidLangType);
    expect(result).toEqual(false);
  });

  it("rate 프로퍼티 타입이 다른 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(invalidRateType);
    expect(result).toEqual(false);
  });

  it("pitch 프로퍼티 타입이 다른 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(invalidPitchType);
    expect(result).toEqual(false);
  });

  it("volume 프로퍼티 타입이 다른 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(invalidVolumeType);
    expect(result).toEqual(false);
  });

  it("빈 객체인 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(emptyObject);
    expect(result).toEqual(false);
  });

  it("null인 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(nullValue);
    expect(result).toEqual(false);
  });

  it("undefined인 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(undefinedValue);
    expect(result).toEqual(false);
  });

  it("숫자인 경우", () => {
    // @ts-expect-error localStorage를 통해 받아온 데이터가 타입스크립트 타입과 맞지 않을 가능성이 있기 때문에
    const result = validateSpeakSetting(numberValue);
    expect(result).toEqual(false);
  });

  it("정상적인 경우 1", () => {
    const result = validateSpeakSetting(validSetting1);
    expect(result).toEqual(true);
  });

  it("정상적인 경우 2", () => {
    const result = validateSpeakSetting(validSetting2);
    expect(result).toEqual(true);
  });

  it("정상적인 경우 3", () => {
    const result = validateSpeakSetting(validSetting3);
    expect(result).toEqual(true);
  });
});

const emptyString = "";
const emptyObjectString = "{}";
const nullObjectString = "{null}";
const uncompleteObject = "{";
const uncompleteObject2 = "}";
const nullString = "null";
const invalidObject = "{a:1}";
const invalidObject2 = '{a:"1"}';
const invalidObject3 = '{"lang":1}';

describe("validateSpeakSettingAtom", () => {
  it("빈 문자열이 입력된 경우", () => {
    const result = validateSpeakSettingAtom(emptyString);
    expect(result).toEqual(defaultSetting);
  });

  it(`${emptyObjectString}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(emptyObjectString);
    expect(result).toEqual(defaultSetting);
  });

  it(`${nullObjectString}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(nullObjectString);
    expect(result).toEqual(defaultSetting);
  });

  it(`${uncompleteObject}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(uncompleteObject);
    expect(result).toEqual(defaultSetting);
  });

  it(`${uncompleteObject2}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(uncompleteObject2);
    expect(result).toEqual(defaultSetting);
  });

  it(`${nullString}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(nullString);
    expect(result).toEqual(defaultSetting);
  });

  it(`${invalidObject}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(invalidObject);
    expect(result).toEqual(defaultSetting);
  });

  it(`${invalidObject2}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(invalidObject2);
    expect(result).toEqual(defaultSetting);
  });

  it(`${invalidObject3}이 입력된 경우`, () => {
    const result = validateSpeakSettingAtom(invalidObject3);
    expect(result).toEqual(defaultSetting);
  });

  it("selectedVoice 프로퍼티가 없을 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(woselectedVoice));
    expect(result).toEqual(defaultSetting);
  });

  it("lang 프로퍼티가 없을 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(woLang));
    expect(result).toEqual(defaultSetting);
  });

  it("rate 프로퍼티가 없을 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(woRate));
    expect(result).toEqual(defaultSetting);
  });

  it("pitch 프로퍼티가 없을 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(woPitch));
    expect(result).toEqual(defaultSetting);
  });

  it("volume 프로퍼티가 없을 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(woVolume));
    expect(result).toEqual(defaultSetting);
  });

  it("lang의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidLangValue));
    expect(result).toEqual(defaultSetting);
  });

  it("rate의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidRateValue));
    expect(result).toEqual(defaultSetting);
  });

  it("pitch의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidPitchValue));
    expect(result).toEqual(defaultSetting);
  });

  it("volume의 값이 범위를 초과한 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidVolumeValue));
    expect(result).toEqual(defaultSetting);
  });

  it("프로퍼티가 추가된 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(addedProperty));
    expect(result).toEqual(defaultSetting);
  });

  it("lang 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSettingAtom(
      JSON.stringify(invalidLangProperty)
    );
    expect(result).toEqual(defaultSetting);
  });

  it("rate 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSettingAtom(
      JSON.stringify(invalidRateValueProperty)
    );
    expect(result).toEqual(defaultSetting);
  });

  it("pitch 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSettingAtom(
      JSON.stringify(invalidPitchValueProperty)
    );
    expect(result).toEqual(defaultSetting);
  });

  it("volume 프로퍼티가 다른 경우", () => {
    const result = validateSpeakSettingAtom(
      JSON.stringify(invalidVolumeValueProperty)
    );
    expect(result).toEqual(defaultSetting);
  });

  it("lang 프로퍼티 타입이 다른 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidLangType));
    expect(result).toEqual(defaultSetting);
  });

  it("rate 프로퍼티 타입이 다른 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidRateType));
    expect(result).toEqual(defaultSetting);
  });

  it("pitch 프로퍼티 타입이 다른 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidPitchType));
    expect(result).toEqual(defaultSetting);
  });

  it("volume 프로퍼티 타입이 다른 경우", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(invalidVolumeType));
    expect(result).toEqual(defaultSetting);
  });

  it("정상적인 입력된 경우 1-1", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(validSetting1));
    expect(result).toEqual(validSetting1);
  });

  it("정상적인 입력된 경우 1-2", () => {
    const result = validateSpeakSettingAtom(
      '{"selectedVoice":"","lang":"ja-JP","rate":0.5,"pitch":1,"volume":1}'
    );
    expect(result).toEqual(validSetting1);
  });

  it("정상적인 입력된 경우 2", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(validSetting2));
    expect(result).toEqual(validSetting2);
  });

  it("정상적인 입력된 경우 3", () => {
    const result = validateSpeakSettingAtom(JSON.stringify(validSetting3));
    expect(result).toEqual(validSetting3);
  });
});
