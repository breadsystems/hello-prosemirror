import { Schema } from "prosemirror-model"
import { schema } from "prosemirror-schema-basic"
import { addListNodes } from "prosemirror-schema-list"

import { mountEditorInto } from './lib'

//mountEditorInto(document.querySelector('.editable'), {
//  schema: schemaFromPatterns([]),
//  plugins: defaultPlugins,
//})

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
mountEditorInto(document.querySelector('.editable'), {
  schema: new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  })
});
