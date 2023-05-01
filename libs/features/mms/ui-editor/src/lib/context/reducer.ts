import { initialState, EditorActionType, EditorActionProps, EditorProps } from './types';

const reducer = (state: EditorProps, action: EditorActionProps) => {
  switch (action.type) {
    case EditorActionType.INIT_COMPONENTS: {
      const { components } = action;
      return { ...state, components };
    }
    case EditorActionType.SET_CURRENT_COMPONENT: {
      const { component: selectedComponent } = action;
      return { ...state, selectedComponent };
    }
    case EditorActionType.ADD_COMPONENT: {
      const { component } = action;
      return { ...state, components: [...state.components, component] };
    }
    case EditorActionType.REMOVE_COMPONENT: {
      const { id } = action;
      return { ...state, components: state.components.filter((o) => o.id !== id) };
    }
    case EditorActionType.UPDATE_COMPONENT: {
      const {
        component,
        component: { id },
      } = action;
      //preserve the order of the components
      return { ...state, components: state.components.map((o) => (o.id === id ? component : o)) };
    }

    default: {
      return initialState;
    }
  }
};
export default reducer;
