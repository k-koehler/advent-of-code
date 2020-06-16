package main

func assert(condition bool) {
	if !condition {
		panic("failed assertion")
	}
}

func strdrop(s string, start int) string {
	sub := ""
	for i := start; i < len(s); i++ {
		sub += string(s[i])
	}
	return sub
}

func strbegins(s string, sub string) bool {
	if len(s) < len(sub) {
		return false
	}
	for i := 0; i < len(sub); i++ {
		if s[i] != sub[i] {
			return false
		}
	}
	return true
}

type MunchResult struct {
	value       int
	munch_chars int
}

func munch(s string) MunchResult {
	if strbegins(s, "M") {
		return MunchResult{value: 1000, munch_chars: 1}
	}
	if strbegins(s, "CM") {
		return MunchResult{value: 900, munch_chars: 2}
	}
	if strbegins(s, "D") {
		return MunchResult{value: 500, munch_chars: 1}
	}
	if strbegins(s, "CD") {
		return MunchResult{value: 400, munch_chars: 2}
	}
	if strbegins(s, "XC") {
		return MunchResult{value: 90, munch_chars: 2}
	}
	if strbegins(s, "C") {
		return MunchResult{value: 100, munch_chars: 1}
	}
	if strbegins(s, "L") {
		return MunchResult{value: 50, munch_chars: 1}
	}
	if strbegins(s, "XL") {
		return MunchResult{value: 40, munch_chars: 2}
	}
	if strbegins(s, "X") {
		return MunchResult{value: 10, munch_chars: 1}
	}
	if strbegins(s, "IX") {
		return MunchResult{value: 9, munch_chars: 2}
	}
	if strbegins(s, "V") {
		return MunchResult{value: 5, munch_chars: 1}
	}
	if strbegins(s, "IV") {
		return MunchResult{value: 4, munch_chars: 2}
	}
	if strbegins(s, "III") {
		return MunchResult{value: 3, munch_chars: 3}
	}
	if strbegins(s, "II") {
		return MunchResult{value: 2, munch_chars: 2}
	}
	if strbegins(s, "I") {
		return MunchResult{value: 1, munch_chars: 1}
	}
	panic("malformed numeral")
}

func romanToInt(s string) int {
	intValue := 0
	for len(s) != 0 {
		munchResult := munch(s)
		s = strdrop(s, munchResult.munch_chars)
		intValue += munchResult.value
	}
	return intValue
}

func main() {
	romanTestCases := []struct {
		in  string
		out int
	}{
		{"I", 1},
		{"II", 2},
		{"III", 3},
		{"IV", 4},
		{"V", 5},
		{"VI", 6},
		{"VII", 7},
		{"VIII", 8},
		{"IX", 9},
		{"X", 10},
		{"XI", 11},
		{"XIV", 14},
		{"XIX", 19},
		{"XL", 40},
		{"L", 50},
		{"XC", 90},
		{"C", 100},
		{"CD", 400},
		{"D", 500},
		{"CM", 900},
		{"M", 1000},
		{"MCMXCIV", 1994},
	}
	for _, testCase := range romanTestCases {
		assert(romanToInt(testCase.in) == testCase.out)
	}
}
