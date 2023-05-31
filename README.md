# 
<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="45" src="https://avatars.githubusercontent.com/u/33663932?s=100&v=4" alt="MUI logo"></a>
<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>
</p>

<h1 align="center">LTHS MUI - NX MONOREPO</h1>


## Getting Started

### Gitpod Development Workspace

#### Open the Develop branch:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/github.com/briteliteimmersive/lths-mui/tree/develop)

#### Open other branches:

[![Open a branch Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/projects/lths-mui)



### Dependencies

* Create an .env file with the following for endpoint configuration.
* env variable should start with NX_
    * NX_PUBLIC_HOST_PROTOCOL=https
    * NX_PUBLIC_API_HOST_DOMAIN=<API_ENDPOINT>
    * NX_PUBLIC_API_HOST_VERSION_PATH=<API_VERSION_PARTIAL_PATH>
    * NX_PUBLIC_API_MOCKING=enabled

## Installation


To install dependencies, you can run the following from root dir (/lths-mui). The packages are managed on a root level. 
```
yarn install
```

## Add New Packages
To add a package, make sure your terminal is pointed to the root nx-workspace(/lths-mui), then run yarn add <package-name>


## Running app


## Development server

Run `nx serve mms` for a dev server. Navigate to http://localhost:4200/. Alternatively, you can add the NX console extension in your VS code and hit run (refer screen-short). The app will automatically reload if you change any of the source files.
```
yarn nx run ams:serve:development
```
or
```
nx serve mms
```

## Running multiple apps
To run multiple apps simultaneously, you can run the following with --port flag.
```
yarn nx run ams:serve:development --port 4202
```

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.


## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
Visit the [MUI Documentation](https://mui.com/) to learn more.

