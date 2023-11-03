import { EditorActionType, EditorActionProps, EditorProps } from './types';
import { addNewComponent, duplicateComponent, initComponents, renameComponent, swapComponent } from './utils';

const reducer = <T extends EditorProps = EditorProps>(state: T, action: EditorActionProps<T>) => {
  switch (action.type) {
    case EditorActionType.UPDATE_EXTENDED: {
      //update the extended props of the T object while keeping the data property intact,
      return {
        ...state,
        ...action.data,
        components: state.components,
        selectedComponent: state.selectedComponent,
        hasUnsavedEdits: true,
      };
    }
    case EditorActionType.SET_CURRENT_COMPONENT: {
      const { component } = action;
      return {
        ...state,
        selectedComponent: component,
      };
    }

    case EditorActionType.CLEAR_CURRENT_COMPONENT: {
      return {
        ...state,
        selectedComponent: null,
      };
    }

    case EditorActionType.UPDATE_COMPONENT: {
      const {
        component,
        component: { __ui_id__ },
      } = action;
      //preserve the order of the components
      return {
        ...state,
        selectedComponent: component,
        components: state.components.map((o) => (o.__ui_id__ === __ui_id__ ? component : o)),
        hasUnsavedEdits: true,
      };
    }

    case EditorActionType.INIT_COMPONENTS: {
      const {
        data: { components, ...rest },
      } = action;
      const initialComponents = initComponents(components);
      return {
        ...state,
        ...rest,
        components: initialComponents,
        selectedComponent: initialComponents?.length > 0 ? initialComponents[0] : null,
        hasUnsavedEdits: false,
      };
    }

    case EditorActionType.ADD_COMPONENT: {
      const { component } = action;
      const components = addNewComponent(state.components, component);
      return { ...state, components, selectedComponent: components[components.length - 1], hasUnsavedEdits: true };
    }
    case EditorActionType.RENAME_COMPONENT: {
      const { id, name } = action;
      return {
        ...state,
        selectedComponent: renameComponent(state.selectedComponent, name),
        components: state.components.map((o) => (o.__ui_id__ === id ? renameComponent(o, name) : o)),
        hasUnsavedEdits: true,
      };
    }

    case EditorActionType.REMOVE_COMPONENT: {
      const { id } = action;
      return {
        ...state,
        selectedComponent: state.selectedComponent?.__ui_id__ === id ? null : state.selectedComponent,
        components: state.components.filter((o) => o.__ui_id__ !== id),
        hasUnsavedEdits: true,
      };
    }

    case EditorActionType.ORDER_COMPONENT: {
      const { dragIndex, hoverIndex } = action;
      const components = swapComponent(state.components, dragIndex, hoverIndex);
      return { ...state, components, hasUnsavedEdits: true };
    }

    case EditorActionType.DUPLICATE_COMPONENT: {
      const { id } = action;
      const components = duplicateComponent(state.components, id);

      return {
        ...state,
        components,
        hasUnsavedEdits: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
