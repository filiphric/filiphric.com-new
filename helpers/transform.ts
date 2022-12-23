import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import "prismjs/components/prism-bash";
import { punctuation } from './punctuation';

export const transform = (body: any, language: string, highlights: number[]) => {

  Prism.languages.insertBefore('json', 'punctuation', punctuation);
  Prism.languages.insertBefore('js', 'punctuation', punctuation);
  Prism.languages.insertBefore('ts', 'punctuation', punctuation);

  const formatted = Prism.highlight(body, Prism.languages[language], language)

  let code = formatted.split('\n')
    .map((line, num) => `<span ${highlights.includes(num + 1) ? 'class="highlight"' : ''}><span class="line-number">${(num + 1).toString().padStart(2, ' ')}  </span>${line}</span>`)
    .slice(0, -1) // remove last line
    .join('\n');


  return code

}