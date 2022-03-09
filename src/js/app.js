import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

const node = document.querySelector('.editable');


//mountEditorInto(document.querySelector('.editable'), {
//  schema: schemaFromPatterns([]),
//  plugins: defaultPlugins,
//})

const mountEditorInto = (node, config) => {
  const state = EditorState.create({
    doc: DOMParser.fromSchema(config.schema).parse(node),
    plugins: exampleSetup(config),
  })

  new EditorView(node.parentNode, { state });

  node.parentNode.removeChild(node);
};

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
mountEditorInto(node, {
  schema: new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  })
});
