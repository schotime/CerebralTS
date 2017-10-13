export interface CoreSignals {
    newItemTitleSubmitted: (() => void),
    newItemTitleChanged: ((input: { title: string }) => void)
}