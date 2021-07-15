import {DOMParser, Schema} from 'prosemirror-model'
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import { keymap } from "prosemirror-keymap"
import { undo, redo, history } from "prosemirror-history"
import {baseKeymap, liftEmptyBlock, splitBlock, chainCommands, newlineInCode, createParagraphNear} from "prosemirror-commands"

export const defaultPlugins = [
  history(),
  // give custom mappings priority
  keymap({
    "Mod-z": undo,
    "Mod-y": redo,
    // "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
    "Mod-0": splitBlock,
    "Mod-1": liftEmptyBlock,
    "Mod-2": createParagraphNear,
    "Shift-Enter": () => console.log('Shift'),
    "Mod-Enter": () => console.log('Mod'),
    "Alt-Enter": () => console.log('Alt'),
  }),
  keymap(baseKeymap),
]

export function mountEditorInto(node, config) {
  const state = EditorState.create(Object.assign({}, {
    doc: DOMParser.fromSchema(config.schema).parse(node),
  }, config))

  new EditorView(node.parentNode, {state})

  node.parentNode.removeChild(node)
}
