import {DOMParser, Schema} from 'prosemirror-model'
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"

export function mountEditorInto(node, config) {
  const state = EditorState.create(Object.assign({}, {
    doc: DOMParser.fromSchema(config.schema).parse(node),
  }, config))

  new EditorView(node.parentNode, {state})

  node.parentNode.removeChild(node)
}
