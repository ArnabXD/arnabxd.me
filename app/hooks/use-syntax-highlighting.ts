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
              theme: 'ayu-dark',
              transformers: [
                {
                  pre(node) {
                    // Apply minimal Shiki styling - we'll preserve React classes in replacement
                    node.properties.class = 'shiki';
                    node.properties.style = 'background-color: #000000 !important;';
                  },
                  code(node) {
                    node.properties.class = 'block font-mono shiki-processed';
                  }
                }
              ]
            });
            
            // Handle replacement - just replace the content, preserve the structure
            const preElement = codeElement.closest('pre');
            
            if (preElement && !preElement.classList.contains('shiki-processed')) {
              // Mark as processed first to avoid infinite loops
              preElement.classList.add('shiki-processed');
              
              // Extract just the highlighted code content
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = highlighted;
              const newPreElement = tempDiv.firstElementChild as HTMLElement;
              
              if (newPreElement) {
                // Get the highlighted code content
                const highlightedCode = newPreElement.querySelector('code');
                const originalCode = preElement.querySelector('code');
                
                if (highlightedCode && originalCode) {
                  // Replace just the code content, keeping our pre element structure
                  originalCode.innerHTML = highlightedCode.innerHTML;
                  originalCode.className = highlightedCode.className;
                }
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