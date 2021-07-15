import { mountEditorInto } from './lib'
import { keymap } from "prosemirror-keymap"
import { undo, redo, history } from "prosemirror-history"
import {baseKeymap, liftEmptyBlock, splitBlock, chainCommands, newlineInCode, createParagraphNear} from "prosemirror-commands"

import { schema } from "./schema"

mountEditorInto(document.querySelector('.editable'), {
  schema,
  plugins: [
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
});

