import { v4 as uuid } from 'uuid';

import { initialState, EditorActionType, EditorActionProps, EditorProps, ComponentProps } from './types';

const fillUuid = (component: ComponentProps) => ({ ...component, __ui_id__: uuid() });

const reducer = (state: EditorProps, action: EditorActionProps) => {
  switch (action.type) {
    case EditorActionType.SET_CURRENT_COMPONENT: {
      const {
        component,
        component: { __ui_id__ },
      } = action;
      return {
        ...state,
        selectedComponent: component,
        components: state.components.map((o) => (o.__ui_id__ === __ui_id__ ? component : o)),
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
      return { ...state, components: state.components.map((o) => (o.__ui_id__ === __ui_id__ ? component : o)) };
    }

    case EditorActionType.INIT_COMPONENTS: {
      const { components } = action;
      return { ...state, components: components.map((component) => fillUuid(component)) };
    }

    case EditorActionType.ADD_COMPONENT: {
      const { component } = action;
      console.log('ADD_COMPONENT', [...state.components, fillUuid(component)]);
      return { ...state, components: [...state.components, fillUuid(component)] };
    }

    case EditorActionType.REMOVE_COMPONENT: {
      const { id } = action;
      return { ...state, components: state.components.filter((o) => o.__ui_id__ !== id) };
    }

    case EditorActionType.ORDER_COMPONENT: {
      const { dragIndex, hoverIndex } = action;
      const dragged = state.components[dragIndex];
      const components = [...state.components];
      components.splice(dragIndex, 1);
      components.splice(hoverIndex, 0, dragged);

      //preserve the order of the components
      return { ...state, components };
    }

    case EditorActionType.DUPLICATE_COMPONENT: {
      const { id } = action;
      const index = state.components.findIndex((o) => o.__ui_id__ === id);
      if (index !== -1) {
        const duplicate = { ...fillUuid(state.components[index]) };
        return {
          ...state,
          components: [...state.components.slice(0, index), duplicate, ...state.components.slice(index)],
        };
      }

      return state;
    }

    default: {
      return initialState;
    }
  }
};

export default reducer;
