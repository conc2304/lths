##

## How to configure routes?

1. Add the paths.tsx to you 'section' folder under src/pages

```

const sections: SectionItemProps = {
  // header: "Header 2",
  items: [
    {
      title: 'Insights',
      icon: <InsightsIcon />,
      path: '/insights/overview',
      file: '/insights/overview-page',
      items: [
        {
          title: 'Flows',
          icon: <FlowIcon />,
          path: '/insights/flows',
        },]
        }]}

```

Make sure that your page component is exported as a default export and not a named export

```
const SamplePage = () => {
  return <>Page Content</>;
};

export default SamplePage;
```

### How to add links to the drawer/side-bar?

2. Add your section folder's path.tsx to a src/pages/paths.tsx file

```

```

### Updating the Homepage

1. The home page is configured via the transformer.tsx file through a relative file path as a string literal (string variables won't work).

   1. `const HomePage = LazyLoader(lazy(() => import('../relative/path/to/your/homepage/component/file')));`

2. It is expected that the Home config in `apps/mms/src/pages/paths-misc.tsx` not declare a component file via the `file` property. [So should not need to ever change that.]
   1. You should only need the path set to "/"
