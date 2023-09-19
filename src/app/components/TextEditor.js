import { RichTextEditor, Link } from "@mantine/tiptap"
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import { FormValidationMessage } from "./FormValidationMessage";

export const TextEditor = ({ onEdit, errors, loading, title,dataSource, setValue, defaultValue = null }) => {

    const content = defaultValue

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ 
                types: ['heading', 'paragraph'],
            }),
            
            Placeholder.configure({ 
                placeholder: "Say something..."
            })
        ],
        content,
    });

    return(
        <>
            <h5>{title ? title : null}</h5>
            <RichTextEditor editor={editor} h={300} style={{ overflow : 'hidden' }}>
                <RichTextEditor.Toolbar sticky>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                {!loading && (
                    <RichTextEditor.Content 
                        onBlur={() => onEdit(editor.getHTML())}
                    />
                )}
                
            </RichTextEditor>

            {errors && errors['description'] && (
                <FormValidationMessage 
                    message={errors['description'][0]} 
                />
            )}
        </>
        
    )
}