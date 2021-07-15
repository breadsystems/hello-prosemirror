import { mountEditorInto, defaultPlugins, schemaFromPatterns } from './lib'

mountEditorInto(document.querySelector('.editable'), {
  schema: schemaFromPatterns([]),
  plugins: defaultPlugins,
});

