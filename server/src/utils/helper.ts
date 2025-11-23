import fs from "fs/promises"
import { join } from "path"

export async function storageChecked(dirPath: string) {
    try {
        await fs.access(dirPath)
    } catch (e) {
        await fs.mkdir(dirPath, { recursive: true })
    }
}

export async function cheackOrCreateInitFiles() {
    await storageChecked(getPath("storage"))
    await storageChecked(getPath("static"))
}

type GetPathType = "storage" | "static"
export function getPath(storageType?: GetPathType) {
    const storPath = join(__dirname, "..", "..", "storage") 
    switch(storageType) {
        case "storage": return storPath
        case "static": return storPath + `/static`
        default: throw new Error("invalid key")
    }
}

