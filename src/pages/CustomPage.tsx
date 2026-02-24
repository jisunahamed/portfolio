import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { useCustomPage } from '@/hooks/useCustomPages';

/**
 * Simple markdown-like renderer
 * Supports: headings, bold, italic, code blocks, inline code, links, lists, blockquotes, horizontal rules
 */
function renderMarkdown(text: string) {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Code block
        if (line.trim().startsWith('```')) {
            const lang = line.trim().slice(3);
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            elements.push(
                <pre key={elements.length} className="bg-black/40 border border-border/50 rounded-lg p-4 overflow-x-auto my-4">
                    <code className="text-sm text-green-400 font-mono">{codeLines.join('\n')}</code>
                </pre>
            );
            continue;
        }

        // Heading
        if (line.startsWith('# ')) {
            elements.push(<h1 key={elements.length} className="text-3xl font-bold mt-8 mb-4">{renderInline(line.slice(2))}</h1>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={elements.length} className="text-2xl font-bold mt-6 mb-3 border-b border-border/30 pb-2">{renderInline(line.slice(3))}</h2>);
        } else if (line.startsWith('### ')) {
            elements.push(<h3 key={elements.length} className="text-xl font-semibold mt-5 mb-2">{renderInline(line.slice(4))}</h3>);
        } else if (line.startsWith('#### ')) {
            elements.push(<h4 key={elements.length} className="text-lg font-semibold mt-4 mb-2">{renderInline(line.slice(5))}</h4>);
        }
        // Blockquote
        else if (line.startsWith('> ')) {
            elements.push(
                <blockquote key={elements.length} className="border-l-4 border-primary/50 pl-4 py-1 my-3 text-muted-foreground italic">
                    {renderInline(line.slice(2))}
                </blockquote>
            );
        }
        // Horizontal rule
        else if (line.trim() === '---' || line.trim() === '***') {
            elements.push(<hr key={elements.length} className="border-border/30 my-6" />);
        }
        // Unordered list
        else if (line.match(/^[\s]*[-*]\s/)) {
            const indent = line.search(/[^\s]/);
            elements.push(
                <li key={elements.length} className="ml-4 list-disc text-foreground/90" style={{ marginLeft: `${indent * 8 + 16}px` }}>
                    {renderInline(line.replace(/^[\s]*[-*]\s/, ''))}
                </li>
            );
        }
        // Ordered list
        else if (line.match(/^[\s]*\d+\.\s/)) {
            elements.push(
                <li key={elements.length} className="ml-4 list-decimal text-foreground/90">
                    {renderInline(line.replace(/^[\s]*\d+\.\s/, ''))}
                </li>
            );
        }
        // Empty line
        else if (line.trim() === '') {
            elements.push(<div key={elements.length} className="h-2" />);
        }
        // Paragraph
        else {
            elements.push(
                <p key={elements.length} className="text-foreground/80 leading-relaxed my-2">
                    {renderInline(line)}
                </p>
            );
        }

        i++;
    }

    return elements;
}

function renderInline(text: string): (string | JSX.Element)[] {
    const result: (string | JSX.Element)[] = [];
    // Process inline formatting: bold, italic, inline code, links
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        if (match[1]) {
            // Bold **text**
            result.push(<strong key={key++} className="font-bold text-foreground">{match[2]}</strong>);
        } else if (match[3]) {
            // Italic *text*
            result.push(<em key={key++} className="italic">{match[4]}</em>);
        } else if (match[5]) {
            // Inline code `text`
            result.push(
                <code key={key++} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
                    {match[6]}
                </code>
            );
        } else if (match[7]) {
            // Link [text](url)
            result.push(
                <a key={key++} href={match[9]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {match[8]}
                </a>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result.length > 0 ? result : [text];
}

export default function CustomPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: page, isLoading, error } = useCustomPage(slug || '');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground"
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <p className="text-muted-foreground mb-6">Page not found</p>
                    <Link
                        to="/"
                        className="text-primary hover:underline inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/30 bg-card/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> jisun.online
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(page.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                </div>
            </header>

            {/* Content */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
            >
                <h1 className="text-3xl sm:text-4xl font-bold mb-8">{page.title}</h1>

                <article className="prose-custom">
                    {renderMarkdown(page.content)}
                </article>
            </motion.main>

            {/* Footer */}
            <footer className="border-t border-border/30 py-6 text-center">
                <a
                    href="https://jisun.online"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    © {new Date().getFullYear()} jisun.online
                </a>
            </footer>
        </div>
    );
}
