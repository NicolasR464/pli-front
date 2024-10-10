import fs from 'fs'
import path from 'path'

export function getRoutes() {
    const pagesDir = path.join(process.cwd(), 'src/app')
    const files = fs.readdirSync(pagesDir)

    const routes = files
        .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
        .map((file) => {
            const route = file.replace(/\.tsx?$/, '')
            return route === 'index' ? '/' : `/${route}`
        })

    return routes
}
