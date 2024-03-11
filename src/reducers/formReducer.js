export default function formReducer(state, action) {
  switch (action.type) {
    case "setFormValid":
      return {
        ...state,
        formValid: action.payload,
      };
    case "setPhoto":
      return {
        ...state,
        photo: action.payload,
      };
    case "setPhotoValid":
      return {
        ...state,
        photoValid: action.payload,
      };
    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };
    case "setDescriptionValid":
      return {
        ...state,
        descriptionValid: action.payload,
      };
    case "setTags":
      return {
        ...state,
        tags: action.payload,
      };
    case "setTagsValid":
      return {
        ...state,
        tagsValid: action.payload,
      };
    case "reset":
      return {
        formValid: false,
        photo: null,
        photoValid: false,
        description: "",
        descriptionValid: false,
        tags: state.tags.map((tag) => {
          return { name: tag.name, checked: false };
        }),
        tagsValid: false,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}
