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
