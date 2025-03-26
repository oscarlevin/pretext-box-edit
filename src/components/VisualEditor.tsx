import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import { Node } from "@tiptap/core";
import { useEffect } from "react";
import { History } from "@tiptap/extension-history";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { FileHandler } from "@tiptap-pro/extension-file-handler";
import "katex/dist/katex.min.css";
import Focus from "@tiptap/extension-focus";
import Divisions from "../extensions/Divisions";
import Inline from "../extensions/Inline";
import Blocks from "../extensions/Blocks";
import Term from "../extensions/Term";
import Title from "../extensions/Title";
import Definition from "../extensions/Definition";
import KeyboardCommands from "../extensions/Keyboard";
import json2ptx from "../extensions/json2ptx";
//import { useState } from 'react';

const Document = Node.create({
  name: "document",
  topNode: true,
  content: "title introduction? section+",
});

const extensions = [
  KeyboardCommands,
  Document,
  Inline,
  Blocks,
  Divisions,
  Term,
  Title,
  Definition,
  Mathematics,
  Focus.configure({ mode: "deepest" }),
  History,
  FileHandler.configure({
    allowedMimeTypes: ["text/*"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
          const content = fileReader.result;
          console.log(content);
          currentEditor.chain().insertContentAt(pos, content).focus().run();
        };
      });
    },
    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach((file) => {
        if (htmlContent) {
          console.log(htmlContent);
          return false;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: "image",
              attrs: { src: fileReader.result },
            })
            .focus()
            .run();
        };
      });
    },
  }),
];
//const defaultContent = '<p>Hello World</p>';

interface VisualEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const VisualEditor = ({ content, onChange }: VisualEditorProps) => {
  console.log(content);
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML() || ""),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default VisualEditor;
