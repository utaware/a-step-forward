module.exports = {
	// 一行最多多少个字符
	printWidth: 120,
	// 指定每个缩进级别的空格数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: false,
	// 在语句末尾是否需要分号
	semi: false,
	// 是否使用单引号
	singleQuote: true,
	// 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
	quoteProps: 'as-needed',
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: 'all',
	// 在对象文字中的括号之间打印空格
	bracketSpacing: false,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
	arrowParens: 'always',
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	//在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
	//然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
	//对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: 'auto',
}
