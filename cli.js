#!/usr/bin/env node

/**
 * 邻檬智付小程序脚手架
 * 快速创建基于 UniApp + Vue3 + TypeScript 的项目
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✖${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
}

// 脚手架根目录
const CLI_ROOT = __dirname
const TEMPLATES_DIR = path.join(CLI_ROOT, 'templates')

/**
 * 创建项目
 */
function createProject(projectName, options = {}) {
  log.title(`🚀 创建项目: ${projectName}`)

  const targetDir = path.resolve(process.cwd(), projectName)

  // 检查目录是否存在
  if (fs.existsSync(targetDir)) {
    log.error(`目录 ${projectName} 已存在`)
    process.exit(1)
  }

  // 创建目录
  fs.mkdirSync(targetDir, { recursive: true })
  log.success(`创建目录: ${projectName}`)

  // 复制模板文件
  copyTemplate('project', targetDir, {
    projectName,
    ...options,
  })

  // 创建 src 目录结构
  createSrcStructure(targetDir)

  // 安装依赖
  if (options.install !== false) {
    log.info('正在安装依赖...')
    try {
      execSync('npm install --legacy-peer-deps', {
        cwd: targetDir,
        stdio: 'inherit',
      })
      log.success('依赖安装完成')
    } catch (error) {
      log.warning('依赖安装失败，请手动运行 npm install')
    }
  }

  // 初始化 git
  if (options.git !== false) {
    try {
      execSync('git init', { cwd: targetDir, stdio: 'ignore' })
      log.success('Git 仓库初始化完成')
    } catch (error) {
      // 忽略错误
    }
  }

  log.title('✨ 项目创建成功!')
  console.log(`  cd ${projectName}`)
  console.log('  npm run dev:mp-weixin  # 运行微信小程序')
  console.log('  npm run dev:h5         # 运行 H5')
}

/**
 * 创建 src 目录结构
 */
function createSrcStructure(targetDir) {
  const dirs = [
    'src/api/modules',
    'src/components/business',
    'src/components/common',
    'src/composables',
    'src/config',
    'src/constants',
    'src/pages',
    'src/static/images',
    'src/static/icons',
    'src/stores',
    'src/styles',
    'src/types',
    'src/utils',
  ]

  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(targetDir, dir), { recursive: true })
  })

  log.success('创建目录结构')
}

/**
 * 复制模板
 */
function copyTemplate(templateName, targetDir, variables = {}) {
  const templateDir = path.join(TEMPLATES_DIR, templateName)

  if (!fs.existsSync(templateDir)) {
    log.error(`模板 ${templateName} 不存在`)
    return
  }

  copyDir(templateDir, targetDir, variables)
}

/**
 * 递归复制目录
 */
function copyDir(src, dest, variables) {
  const entries = fs.readdirSync(src, { withFileTypes: true })

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name)
    let destPath = path.join(dest, entry.name)

    // 处理模板文件名（如 _gitignore -> .gitignore）
    if (entry.name.startsWith('_')) {
      destPath = path.join(dest, entry.name.replace('_', '.'))
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath, variables)
    } else {
      let content = fs.readFileSync(srcPath, 'utf-8')

      // 替换变量
      Object.keys(variables).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        content = content.replace(regex, variables[key])
      })

      fs.writeFileSync(destPath, content)
    }
  })
}

/**
 * 创建页面
 */
function createPage(pageName, options = {}) {
  log.title(`📄 创建页面: ${pageName}`)

  const pagePath = options.subpackage
    ? `src/package-${options.subpackage}/pages/${pageName}`
    : `src/pages/${pageName}`

  const targetDir = path.resolve(process.cwd(), pagePath)

  if (fs.existsSync(targetDir)) {
    log.error(`页面 ${pageName} 已存在`)
    process.exit(1)
  }

  fs.mkdirSync(targetDir, { recursive: true })

  // 复制页面模板
  copyTemplate('page', targetDir, {
    pageName,
    PageName: toPascalCase(pageName),
  })

  // 更新 pages.json
  updatePagesJson(pageName, options)

  log.success(`页面创建完成: ${pagePath}`)
}

/**
 * 创建组件
 */
function createComponent(componentName, options = {}) {
  log.title(`🧩 创建组件: ${componentName}`)

  const type = options.type || 'common'
  const componentPath = `src/components/${type}/${toPascalCase(componentName)}.vue`
  const targetFile = path.resolve(process.cwd(), componentPath)

  if (fs.existsSync(targetFile)) {
    log.error(`组件 ${componentName} 已存在`)
    process.exit(1)
  }

  // 确保目录存在
  fs.mkdirSync(path.dirname(targetFile), { recursive: true })

  // 复制组件模板
  const templateDir = path.join(TEMPLATES_DIR, 'component')
  const templateFile = path.join(templateDir, 'Component.vue')

  let content = fs.readFileSync(templateFile, 'utf-8')
  content = content.replace(/{{ComponentName}}/g, toPascalCase(componentName))
  content = content.replace(/{{componentName}}/g, toKebabCase(componentName))

  fs.writeFileSync(targetFile, content)

  log.success(`组件创建完成: ${componentPath}`)
}

/**
 * 创建 API 模块
 */
function createApi(moduleName) {
  log.title(`🔌 创建 API 模块: ${moduleName}`)

  const apiPath = `src/api/modules/${moduleName}.ts`
  const targetFile = path.resolve(process.cwd(), apiPath)

  if (fs.existsSync(targetFile)) {
    log.error(`API 模块 ${moduleName} 已存在`)
    process.exit(1)
  }

  // 复制 API 模板
  const templateFile = path.join(TEMPLATES_DIR, 'api', 'module.ts')
  let content = fs.readFileSync(templateFile, 'utf-8')
  content = content.replace(/{{moduleName}}/g, moduleName)
  content = content.replace(/{{ModuleName}}/g, toPascalCase(moduleName))

  fs.writeFileSync(targetFile, content)

  // 更新 api/index.ts
  updateApiIndex(moduleName)

  log.success(`API 模块创建完成: ${apiPath}`)
}

/**
 * 创建组合式函数
 */
function createComposable(composableName) {
  log.title(`⚡ 创建组合式函数: use${toPascalCase(composableName)}`)

  const composablePath = `src/composables/use${toPascalCase(composableName)}.ts`
  const targetFile = path.resolve(process.cwd(), composablePath)

  if (fs.existsSync(targetFile)) {
    log.error(`组合式函数 ${composableName} 已存在`)
    process.exit(1)
  }

  // 复制模板
  const templateFile = path.join(TEMPLATES_DIR, 'composable', 'useComposable.ts')
  let content = fs.readFileSync(templateFile, 'utf-8')
  content = content.replace(/{{ComposableName}}/g, toPascalCase(composableName))

  fs.writeFileSync(targetFile, content)

  // 更新 index.ts
  updateComposablesIndex(composableName)

  log.success(`组合式函数创建完成: ${composablePath}`)
}

/**
 * 更新 pages.json
 */
function updatePagesJson(pageName, options) {
  const pagesJsonPath = path.resolve(process.cwd(), 'src/pages.json')

  if (!fs.existsSync(pagesJsonPath)) {
    log.warning('pages.json 不存在，请手动添加页面配置')
    return
  }

  const content = fs.readFileSync(pagesJsonPath, 'utf-8')
  const config = JSON.parse(content)

  const pageConfig = {
    path: options.subpackage
      ? `package-${options.subpackage}/pages/${pageName}/index`
      : `pages/${pageName}/index`,
    style: {
      navigationStyle: 'custom',
    },
  }

  if (options.subpackage) {
    // 添加到分包
    const subPackage = config.subPackages.find(
      (p) => p.root === `package-${options.subpackage}`
    )
    if (subPackage) {
      subPackage.pages.push(pageConfig)
    } else {
      config.subPackages.push({
        root: `package-${options.subpackage}`,
        pages: [pageConfig],
      })
    }
  } else {
    // 添加到主包
    config.pages.push(pageConfig)
  }

  fs.writeFileSync(pagesJsonPath, JSON.stringify(config, null, '\t'))
}

/**
 * 更新 api/index.ts
 */
function updateApiIndex(moduleName) {
  const indexPath = path.resolve(process.cwd(), 'src/api/index.ts')

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `export * from './modules/${moduleName}'\n`)
    return
  }

  const content = fs.readFileSync(indexPath, 'utf-8')
  const exportLine = `export * from './modules/${moduleName}'\n`

  if (!content.includes(exportLine)) {
    fs.appendFileSync(indexPath, exportLine)
  }
}

/**
 * 更新 composables/index.ts
 */
function updateComposablesIndex(composableName) {
  const indexPath = path.resolve(process.cwd(), 'src/composables/index.ts')
  const name = toPascalCase(composableName)

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `export * from './use${name}'\n`)
    return
  }

  const content = fs.readFileSync(indexPath, 'utf-8')
  const exportLine = `export * from './use${name}'\n`

  if (!content.includes(exportLine)) {
    fs.appendFileSync(indexPath, exportLine)
  }
}

/**
 * 工具函数：转 PascalCase
 */
function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase())
}

/**
 * 工具函数：转 kebab-case
 */
function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

/**
 * 显示帮助
 */
function showHelp() {
  console.log(`
${colors.bright}邻檬智付小程序脚手架${colors.reset}

${colors.cyan}用法:${colors.reset}
  lmzf-cli <command> [options]

${colors.cyan}命令:${colors.reset}
  create <project-name>       创建新项目
  page <page-name>            创建页面
  component <component-name>  创建组件
  api <module-name>           创建 API 模块
  composable <name>           创建组合式函数

${colors.cyan}选项:${colors.reset}
  --subpackage <name>         指定分包名称
  --type <type>               组件类型 (business|common|layout)
  --no-install                跳过依赖安装
  --no-git                    跳过 git 初始化

${colors.cyan}示例:${colors.reset}
  lmzf-cli create my-app
  lmzf-cli page user-center
  lmzf-cli page order-list --subpackage order
  lmzf-cli component product-card --type business
  lmzf-cli api product
  lmzf-cli composable scroll
`)
}

// 解析命令行参数
const args = process.argv.slice(2)
const command = args[0]
const name = args[1]
const options = {}

// 解析选项
for (let i = 2; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].replace('--', '').replace('no-', '')
    const value = args[i].startsWith('--no-') ? false : args[i + 1] || true
    options[key] = value
    if (value !== false && args[i + 1] && !args[i + 1].startsWith('--')) {
      i++
    }
  }
}

// 执行命令
switch (command) {
  case 'create':
    if (!name) {
      log.error('请指定项目名称')
      showHelp()
      process.exit(1)
    }
    createProject(name, options)
    break

  case 'page':
    if (!name) {
      log.error('请指定页面名称')
      process.exit(1)
    }
    createPage(name, options)
    break

  case 'component':
    if (!name) {
      log.error('请指定组件名称')
      process.exit(1)
    }
    createComponent(name, options)
    break

  case 'api':
    if (!name) {
      log.error('请指定 API 模块名称')
      process.exit(1)
    }
    createApi(name)
    break

  case 'composable':
    if (!name) {
      log.error('请指定组合式函数名称')
      process.exit(1)
    }
    createComposable(name)
    break

  case 'help':
  case '-h':
  case '--help':
  default:
    showHelp()
    break
}
