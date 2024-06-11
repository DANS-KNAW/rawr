import { ReactNode } from "react";

export interface TextInputDto {
    name: string;
    callback: (key: string, value: string) => void;
    infoDialog: (content: ReactNode[]) => void;
}