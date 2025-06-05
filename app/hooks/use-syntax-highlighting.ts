import { useEffect, useRef } from "react";
import { getHighlighter } from "~/utils/syntax-highlighter";

export function useSyntaxHighlighting(contentRef?: React.RefObject<HTMLElement>) {
  const hasProcessed = useRef(false);

  useEffect(() => {
    async function enhanceCodeBlocks() {
      // Prevent double processing
      if (hasProcessed.current) return;
      
      try {
        const highlighter = await getHighlighter();
        const container = contentRef?.current || document;
        const codeBlocks = container.querySelectorAll('code[data-language]');
        
        if (codeBlocks.length === 0) return;
        
        const promises = Array.from(codeBlocks).map(async (block) => {
          const codeElement = block as HTMLElement;
          const language = codeElement.dataset.language || 'text';
          const code = codeElement.textContent || '';
          
          // Skip if already processed
          if (codeElement.classList.contains('shiki-processed')) return;
          
          try {
            const highlighted = highlighter.codeToHtml(code, {
              lang: language,
              theme: 'github-dark',
              transformers: [
                {
                  pre(node) {
                    // Apply matrix-themed styling
                    node.properties.class = [
                      'shiki',
                      'shiki-processed',
                      'bg-black',
                      'border',
                      'border-green-500/30',
                      'rounded',
                      'p-4',
                      'overflow-x-auto',
                      'font-mono',
                      'text-sm',
                      'mb-4'
                    ].join(' ');
                    node.properties.style = 'background-color: #000000 !important;';
                  },
                  code(node) {
                    node.properties.class = 'block font-mono shiki-processed';
                  }
                }
              ]
            });
            
            // Replace the parent pre element with the highlighted version
            const preElement = codeElement.closest('pre');
            if (preElement && !preElement.classList.contains('shiki-processed')) {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = highlighted;
              const newPreElement = tempDiv.firstElementChild;
              if (newPreElement) {
                preElement.replaceWith(newPreElement);
              }
            }
          } catch (error) {
            console.warn(`Failed to highlight code block with language "${language}":`, error);
            // Mark as processed even if highlighting fails
            codeElement.classList.add('shiki-processed', 'text-green-400', 'font-mono');
          }
        });

        await Promise.all(promises);
        hasProcessed.current = true;
      } catch (error) {
        console.error('Failed to initialize syntax highlighter:', error);
      }
    }

    // Use requestAnimationFrame for better performance
    const rafId = requestAnimationFrame(() => {
      // Small delay to ensure DOM is ready
      setTimeout(enhanceCodeBlocks, 50);
    });

    return () => {
      cancelAnimationFrame(rafId);
      hasProcessed.current = false;
    };
  }, [contentRef]);
}