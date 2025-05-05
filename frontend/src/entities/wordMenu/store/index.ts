import { atom } from "jotai";

import { AnchorPosition } from "../types";

export const wordMenuAnchorPositionState = atom<AnchorPosition | null>(null);
export const wordMenuSelectedWordState = atom<string | null>(null);
