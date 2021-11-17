import { IProvider } from "./provider";

export interface IAppConfig {
    providerId: number;
    theme: ITheme;
    logoUrl: string;
    menuItems: Array<IMenuItem>;
    pageStyle: IPageStyle;
    header: ISection;
    footer: ISection;
    sections: Array<ISection>;
}

export interface ITheme {
    // body
    "--theme-font-family": string;

    "--theme-color-background": string;
    "--theme-color-on-background": string;
    "--theme-color-surface": string;
    "--theme-color-on-surface": string;

    // theme colors
    "--theme-color-neutral--2": string;
    "--theme-color-neutral--1": string;
    "--theme-color-neutral-0": string;
    "--theme-color-neutral-1": string;
    "--theme-color-neutral-2": string;

    "--theme-color-on-neutral--2": string;
    "--theme-color-on-neutral--1": string;
    "--theme-color-on-neutral-0": string;
    "--theme-color-on-neutral-1": string;
    "--theme-color-on-neutral-2": string;

    "--theme-color-primary--2": string;
    "--theme-color-primary--1": string;
    "--theme-color-primary-0": string;
    "--theme-color-primary-1": string;
    "--theme-color-primary-2": string;

    "--theme-color-on-primary--2": string;
    "--theme-color-on-primary--1": string;
    "--theme-color-on-primary-0": string;
    "--theme-color-on-primary-1": string;
    "--theme-color-on-primary-2": string;

    "--theme-color-secondary--2": string;
    "--theme-color-secondary--1": string;
    "--theme-color-secondary-0": string;
    "--theme-color-secondary-1": string;
    "--theme-color-secondary-2": string;

    "--theme-color-on-secondary--2": string;
    "--theme-color-on-secondary--1": string;
    "--theme-color-on-secondary-0": string;
    "--theme-color-on-secondary-1": string;
    "--theme-color-on-secondary-2": string;

    // header/footer
    "--theme-header-background-color": string;
    "--theme-footer-background-color": string;

    // box
    "--theme-box-border-radius": string;

    "--theme-error-border-color": string,
    "--theme-error-background-color": string;
    "--theme-error-foreground-color": string;

    "--theme-warning-border-color": string,
    "--theme-warning-background-color": string;
    "--theme-warning-foreground-color": string;

    "--theme-info-border-color": string,
    "--theme-info-background-color": string;
    "--theme-info-foreground-color": string;

    "--theme-note-border-color": string,
    "--theme-note-background-color": string;
    "--theme-note-foreground-color": string;

    "--theme-success-border-color": string,
    "--theme-success-background-color": string;
    "--theme-success-foreground-color": string;

    // buttons
    "--theme-button-border-radius": string;
    "--theme-button-primary-border-color": string;
    "--theme-button-primary-background-color": string;
    "--theme-button-primary-foreground-color": string;
    "--theme-button-secondary-border-color": string;
    "--theme-button-secondary-background-color": string;
    "--theme-button-secondary-foreground-color": string;
    "--theme-button-primary-inactive-border-color": string;
    "--theme-button-primary-inactive-background-color": string;
    "--theme-button-primary-inactive-foreground-color": string;
    "--theme-button-secondary-inactive-border-color": string;
    "--theme-button-secondary-inactive-background-color": string;
    "--theme-button-secondary-inactive-foreground-color": string;
}

export interface IMenuItem {
    text: string;
    routerLink: string;
    icon: Array<string>;
    display: { public: boolean, private: boolean };
}

export interface ISection {
    component: string;
    config: any;
}

export interface IPageStyle {
    container: PageStyleContainerEnum;
    content: PageStyleContentEnum;
}

export enum PageStyleContainerEnum {
    fluidContainer = 'wh-fluid-container',
    container = 'wh-container',
}
export enum PageStyleContentEnum {
    contentCenter = 'wh-content-center',
    contentLeft = 'wh-content-left',
}

export class Section {

    provider: IProvider = {} as IProvider;

    init(config: any, provider: IProvider): void {
        Object.assign(this, config);
        this.provider = provider;
    }
}
