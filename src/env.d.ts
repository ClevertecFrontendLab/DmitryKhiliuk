/* declare module '*.svg' {
    const src: string
    export const ReactComponent: unknown
    // eslint-disable-next-line import/no-default-export
    export default src
}
declare module '*.png' {
    const src: string
    // eslint-disable-next-line import/no-default-export
    export default src
}
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.scss' {
    const classes: CSSModuleClasses
    // eslint-disable-next-line import/no-default-export
    export default classes
} */
declare module '*.scss' {
    export const scss: any;
    // eslint-disable-next-line import/no-default-export
    export default scss
}
declare module '*.svg' {
    export const svg: any;
    // eslint-disable-next-line import/no-default-export
    export default svg
}
declare module '*.jpg' {
    export const jpg: any;
    // eslint-disable-next-line import/no-default-export
    export default jpg
}
declare module '*.png' {
    export const png: any;
    // eslint-disable-next-line import/no-default-export
    export default png
}
