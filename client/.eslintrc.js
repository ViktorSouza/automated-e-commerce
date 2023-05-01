import reactRefresh from 'eslint-plugin-react-refresh'
export default [
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: [
			{
				'react-refresh': reactRefresh,
			},
		],
		rules: {
			'react-refresh/only-export-components': 'warn',
			semi: 'error',
			'prefer-const': 'error',
		},
	},
]
