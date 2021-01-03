import {DOMParser} from 'prosemirror-model'
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, liftEmptyBlock, splitBlock, chainCommands, newlineInCode, createParagraphNear} from "prosemirror-commands"
import {canSplit, liftTarget} from "prosemirror-transform"
import {exampleSetup} from "prosemirror-example-setup"

import {schema} from "./schema"

function liftDanglingListItem(state, dispatch) {
  let {$cursor, $from, $to} = state.selection
  if (!$cursor || $cursor.parent.content.size) return false
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    let before = $cursor.before()
    if (canSplit(state.doc, before)) {
      if (dispatch) dispatch(state.tr.split(before).scrollIntoView())
      return true
    }
  }

  // instead of getting the blockRange, maybe we want to get the current zero-length
  // range and lift that exactly one up from the parent?
  let range = $cursor.blockRange(), target = range && liftTarget(range)
  // if (target == null) return false
  // I think because target is null, lift does nothing here.
  // What does createParagraphNear do?
  if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView())
  console.log($from === $to)
  // console.log($cursor, target == null)
  return true
}

mountEditorInto(document.querySelector('.editable'), {
  schema,
  plugins: [
    history(),
    // give custom mappings priority
    keymap({
      "Mod-z": undo,
      "Mod-y": redo,
      "Alt-Enter": () => console.log('Alt'),
      // liftemptyblock / splitblock
      "Shift-Enter": () => console.log('Shift'),
      "Ctrl-Enter": () => console.log('Ctrl'),
      "Mod-Enter": () => console.log('Mod'),
      "Enter": chainCommands(newlineInCode, createParagraphNear, liftDanglingListItem, liftEmptyBlock, splitBlock),
      "Mod-0": splitBlock,
      "Mod-1": liftEmptyBlock,
      "Mod-2": createParagraphNear,
    }),
    keymap(baseKeymap),
  ]
});



function mountEditorInto(node, config) {
  const state = EditorState.create(Object.assign({}, {
    doc: DOMParser.fromSchema(config.schema).parse(node),
  }, config))

  new EditorView(node.parentNode, {state})

  node.parentNode.removeChild(node)
}