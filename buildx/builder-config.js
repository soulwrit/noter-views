module.exports = {
    productName: '编程空间',
    appId: 'org.ProgramSpace.com',
    copyright: '艾森智能',
    icon: 'client/icons/win.jpg',
    artifactName: '${productName}-v${version}.${ext}',
    compression: 'maximum',
    directories: {
        output: 'release',
        app: 'dist'
    },
    nsis: {
        oneClick: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        // installerIcon: 'client/icons/win-installer.jpg',
        // uninstallerIcon: 'client/icons/win-uninstaller.jpg',
        // installerHeaderIcon: 'client/icons/win-installer-header.jpg',
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: 'program'
    },
    dmg: {
        contents: [
            {
                'x': 130,
                'y': 220
            },
            {
                'x': 410,
                'y': 220,
                'type': 'link',
                'path': '/Applications'
            }
        ]
    },
    win: {
        target: ['nsis:ia32', 'nsis:x64']
    },
    linux: {
        target: [
            'deb',
            'rpm',
            'snap',
            'AppImage'
        ]
    }
}


/*
afterAllArtifactBuild: ,
afterPack: ,
afterSign: ,
apk: ,
appId: ,
appImage: ,
appx: ,
artifactBuildCompleted: ,
artifactBuildStarted: ,
artifactName: ,
asar: ,
asarUnpack: ,
beforeBuild: ,
buildDependenciesFromSource: ,
buildVersion: ,
compression: ,
copyright: ,
cscKeyPassword: ,
cscLink: ,
deb: ,
detectUpdateChannel: ,
directories: ,
dmg: ,
electronCompile: ,
electronDist: ,
electronDownload: ,
electronUpdaterCompatibility: ,
electronVersion: ,
extends: ,
extraFiles: ,
extraMetadata: ,
extraResources: ,
fileAssociations: ,
files: ,
forceCodeSigning: ,
framework: ,
freebsd: ,
generateUpdatesFilesForAllChannels: ,
icon: ,
includePdb: ,
launchUiVersion: ,
linux: ,
mac: ,
mas: ,
msi: ,
muonVersion: ,
nodeGypRebuild: ,
nodeVersion: ,
npmArgs: ,
npmRebuild: ,
npmSkipBuildFromSource: ,
nsis: ,
nsisWeb: ,
onNodeModuleFile: ,
p5p: ,
pacman: ,
pkg: ,
portable: ,
productName: ,
protocols: ,
protonNodeVersion: ,
publish: ,
readonly: ,
releaseInfo: ,
remoteBuild: ,
removePackageScripts: ,
rpm: ,
snap: ,
squirrelWindows: ,
target: ,
win: 

*/