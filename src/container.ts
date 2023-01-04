export const container: IContainer = {
    routes: new Map(),
    pagesPath: `${process.cwd()}/pages`
}
interface IContainer {
    routes: Map<string, any>
    pagesPath: string
}