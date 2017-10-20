export interface CoreSignals {
    newItemTitleSubmitted: (() => void),
    newItemTitleChanged: ((props: { title: string }) => void)
}

export default CoreSignals