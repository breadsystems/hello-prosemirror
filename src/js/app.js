import { mountEditorInto, defaultPlugins } from './lib'

import { schema } from "./schema"

mountEditorInto(document.querySelector('.editable'), {
  schema,
  plugins: defaultPlugins,
});

