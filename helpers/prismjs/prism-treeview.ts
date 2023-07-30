import { resolveIcon } from '../resolveIcon'
// @ts-ignore
Prism.languages.treeview = {
  'treeview-part': {
    pattern: /(^|\n).+/,
    inside: {
      'entry-line': [
        {
          pattern: /\|-- |├── /,
          alias: 'line-h'
        },
        {
          pattern: /\| {3}|│ {3}/,
          alias: 'line-v'
        },
        {
          pattern: /`-- |└── /,
          alias: 'line-v-last'
        },
        {
          pattern: / {4}/,
          alias: 'line-v-gap'
        }
      ],
      comment: {
        pattern: /\/\/.*/,
        greedy: true
      },
      filename: {
        pattern: /.*\S.*/,
        inside: {
          // symlink
          operator: / -> /
        }
      }
    }
  }

}
// @ts-ignore
Prism.hooks.add('wrap', function (env) {
  if (env.language === 'treeview') {
    // Remove line breaks
    if (env.type === 'treeview-part') {
      env.content = env.content.replace(/\n/g, '') + '<br />'
    }
    if (env.type === 'filename') {
      if (/(^|[^\\])\/\s*$/.test(env.content)) {
        env.content = env.content.replace(/\s+$/, '').slice(0, -1)
        // This is a folder
        env.classes.push('dir')
        if (env.content.includes('src')) {
          env.classes.push('src')
        }
        if (env.content.includes('public')) {
          env.classes.push('public')
        }
        if (env.content.includes('node_modules')) {
          env.classes.push('node')
        }
        if (env.content.includes('components')) {
          env.classes.push('components')
        }
        if (env.content.includes('assets')) {
          env.classes.push('assets')
        }
        if (env.content.includes('cypress')) {
          env.classes.push('cypress')
        }
        if (env.content.includes('config')) {
          env.classes.push('config')
        }
        if (env.content.includes('e2e')) {
          env.classes.push('e2e')
        }
        if (env.content.includes('commands')) {
          env.classes.push('commands')
        }
        if (env.content.includes('package')) {
          env.classes.push('package')
        }
        if (env.content.includes('tools') || env.content.includes('utils')) {
          env.classes.push('tools')
        }
        if (env.content.includes('scripts')) {
          env.classes.push('scripts')
        }
        if (env.content.includes('docs')) {
          env.classes.push('docs')
        }
        if (env.content.includes('screenshots')) {
          env.classes.push('images')
        }
        if (env.content.includes('video')) {
          env.classes.push('videos')
        }
        if (env.content.includes('github')) {
          env.classes.push('github')
        }
      } else {
        if (/(^|[^\\])[=*|]\s*$/.test(env.content)) {
          env.content = env.content.slice(0, -1)
        }

        const additionalClasses = resolveIcon(env.content)
        env.classes = env.classes.concat(additionalClasses)
      }
    }
  }
})
