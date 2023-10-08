import cssStyleTypes from './css-style-types.js'

export const patterns = [
  {
    include: '#comments',
  },
  {
    comment: 'tokens header',
    match: '^(tokens)\\s*([a-z|A-Z|0-9]+)?',
    captures: {
      '1': { name: 'keyword' },
      '2': { name: 'entity.other.attribute-name' },
    },
  },
  {
    comment: 'component header',
    match: '^(component)\\s+([a-z|A-Z|0-9]+)',
    captures: {
      '1': { name: 'keyword' },
      '2': { name: 'entity.other.attribute-name' },
    },
  },
  {
    comment: 'elements header',
    match: '^\\s+elements',
    name: 'keyword',
  },
  {
    comment: 'element declaration',
    match: '^\\s+(shape|image|video|text|any|svg)\\s+([a-z|A-Z|0-9|_-]+)\\s*$',
    captures: {
      '1': { name: 'support.type' },
      '2': { name: 'entity.other.attribute-name' }
    }
  },
  {
    comment: 'style header',
    match: '^\\s+(style)\\s*([a-z|A-Z|0-9|_-]+)\\s*(when)?\\s*(\\$[a-z|A-Z|0-9|_-]+)?',
    captures: {
      '1': { name: 'keyword' },
      '2': { name: 'entity.other.attribute-name' },
      '3': { name: 'keyword.control.conditional' },
      '4': { name: 'variable.parameter' }
    },
  },
  {
    comment: 'style property',
    begin: '^\\s+([a-zA-Z0-9_-]+)(?=\\s*:)',
    end: '$',
    name: 'string.single',
    captures: {
      '1': { name: 'support.type.property-name.css' },
    },
    patterns: [
      {
        include: '#style_values'
      }
    ],
  },
  {
    comment: 'variants header',
    name: 'keyword',
    match: '^\\s*variants',
  },
  {
    comment: 'token/variant definition',
    begin: `^\\s+(${cssStyleTypes.join('|')})\\s+([a-zA-Z0-9_-]+)(?=\\s*:)`,
    end: '$',
    name: 'string.single',
    captures: {
      '1': { name: 'support.type' },
      '2': { name: 'variable.parameter' },
      '3': { name: 'markup.punctuation.list.beginning' },
    },
    patterns: [
      {
        include: '#style_values'
      }
    ],
  },
  {
    comment: 'token sub-group',
    name: 'keyword.control',
    match: '^\\s+(\\.)([a-zA-Z0-9_-]+)',
    captures: {
      '1': { name: 'markup.punctuation' },
      '2': { name: 'entity.other.attribute-name' },
    },
  },
  {
    comment: 'story header',
    match: '^(story)\\s+(.*)',
    captures: {
      '1': { name: 'keyword' },
      '2': { name: 'entity.other.attribute-name' },
    },
  },
  {
    comment: 'frame header',
    match: '^\\s+(frame)\\s+(.*)$',
    captures: {
      '1': { name: 'keyword' },
      '2': { name: 'entity.other.attribute-name' },
    },
  },
  {
    comment: 'frame component',
    match: '^\\s+([a-zA-Z0-9_-]+)',
    name: 'entity.other.attribute-name',
  },
]

export const repositories = {
  comments: {
    patterns: [
      {
        name: 'comment.line.double-slash',
        match: '^\\s*//.*',
      },
      {
        name: 'comment.block',
        begin: '^\\s*/\\*',
        end: '^\\s*\\*/',
      },
    ],
  },
  style_values: {
    patterns: [
      {
        begin: '(?<=:\\s+)(\\w+(\\*)?)(\\s*)?(?=,)',
        end: '$',
        beginCaptures: {
            '1': { name: 'string.other' },
            '2': { name: 'entity' }
        },
        patterns: [
          {
              match: '\\s*(,)\\s*(\\w+(\\*)?)',
              captures: {
                  '1': { name: 'markup.punctuation.list.beginning' },
                  '2': { name: 'string.other' },
                  '3': { name: 'entity.name.function' }
              }
          }
        ]
      },
      {
        name: 'variable.parameter',
        match: '(?<=: +)\\$[a-zA-Z_][a-zA-Z0-9_-]*'
      },
      {
        comment: 'file paths',
        name: 'string.unquoted.other',
        match: '(?<=: +)/[\\w\\s\\.-]+(/[\\w\\s\\.-]+)'
      },
      {
        name: 'constant.numeric',
        comment: 'any dimension',
        match: '(?<=: +)\\d+(\\.\\d+)?(px|em|rem|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)'
      },
      {
        name: 'constant.numeric',
        comment: 'hex colors',
        match: '(?<=: +)#[0-9a-fA-F]{3,4}([0-9a-fA-F]{2}){0,2}'
      },
      {
        name: 'constant.numeric',
        comment: 'any number',
        match: '(?<=: +)\\d+(\\.\\d+)?'
      },
      {
        name: 'constant.numeric',
        comment: 'rgb colors',
        match: '(?<=: +)rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)|rgba\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*(?:1|0(?:\\.\\d+)?)\\s*\\)'
      },
      {
        name: 'constant.numeric',
        match: '(?<=: +)hsla?\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*(,\\s*(?:\\d+(?:\\.\\d+)?|\\.\\d+)(%?)\\s*)?\\)'
      },
      {
        name: 'keyword.operator',
        comment: 'toggle on/off',
        match: '(?<=: +)(on|off)',
      },
    ]
  }
}
