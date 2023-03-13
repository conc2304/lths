
## How to configure routes?

1. Add the following to layout-router-configs.tsx file

```
const MyNewComponent = LazyLoader(lazy(() => import('../pages/my-new-page')));

```

```
export const DashRoutes=(authenticated:boolean) => {
 
  return ({
    path: '/',
    element: authenticated ? DashboardLayout : <Navigate to="/login" />,
   
    children: [
       ....
        {
          path: '/pages/my-new-comp',
          element: <MyNewComponent />
       },
       ....
       ]

    })
```
### How to add links to the drawer/side-bar?

2. Add the following to layout-drawer-links.tsx file



```
{

    items: [
      {
        title: "My Section", //or choose a existing section
        icon: <HomeIcon />,
      },]
    },
    {
   
      items: [
        {
          title: "New Component",
          icon: <PaletteIcon />,
          path:'/pages/my-new-comp'
        },
    }
}
```
