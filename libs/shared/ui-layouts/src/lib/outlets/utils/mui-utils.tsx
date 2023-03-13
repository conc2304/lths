/*USEGAE:

const DrawerFullScreenStyled = styled(Drawer, {
 shouldForwardProp: (prop) => shouldForwardProp<LayoutDrawerStateProps>(['open', 'fixedHeader'], prop),
}) shouldForwardProp: (prop) => shouldForwardProp<LayoutDrawerStateProps>(['open', 'fixedHeader'], prop),
})<LayoutDrawerStateProps>(({ theme, open,fixedHeader }) => {
    ....
}))
*/
export const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
    props: Array<keyof CustomProps>,
    prop: PropertyKey,
  ): boolean => !props.includes(prop as string);