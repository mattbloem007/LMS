import _ from 'lodash'

export const idType = [
  {text: 'National ID', value:'National ID'},
  {text: 'Passport', value:'Passport'},
  {text: 'Birth certificate number', value:'Birth certificate number'},
  {text:'Drivers licence', value: 'Drivers licence'},
  {text:'Employee Number', value:'Employee Number'},
  {text:'ETQA Record number', value:'ETQA Record number'},
  {text:'HSRC Registration', value:'HSRC Registration'},
  {text:'Refugee number', value: 'Refugee number'},
  {text:'Student number', value: 'Student number'},
  {text:'Temporary ID number', value:'Temporary ID number'},
  {text:'Unknown', value: 'Unknown'}
]

export const SETA = [
  {text: 'AGRISETA', value:'AGRISETA'},
  {text: 'BANKSETA', value:'BANKSETA'},
  {text: 'CATHSSETA', value:'CATHSSETA'},
  {text: 'CETA', value:'CETA'},
  {text: 'CHIETA', value:'CHIETA'},
  {text: 'ETDP', value:'ETDP'},
  {text: 'EWSETA', value:'EWSETA'},
  {text: 'FASSET', value:'FASSET'},
  {text: 'FOODBEV', value:'FOODBEV'},
  {text: 'FP&MSETA', value:'FP&MSETA'},
  {text: 'HWSETA', value:'HWSETA'},
  {text: 'INSETA', value:'INSETA'},
  {text: 'LGSETA', value:'LGSETA'},
  {text: 'MERSETA', value:'MERSETA'},
  {text: 'MICT', value:'MICT'},
  {text: 'MQA', value:'MQA'},
  {text: 'PSETA', value:'PSETA'},
  {text: 'SASSETA', value:'SASSETA'},
  {text: 'SERVICES SETA', value:'SERVICES SETA'},
  {text: 'TETA', value:'TETA'},
  {text: 'W & RSETA', value:'W & RSETA'}

]



export const status = [
  {text: 'Competent', value:'Competent'},
  {text: 'Not yet competent', value:'Not yet competent'},
  {text: 'Not Submitted', value:'Not Submitted'},
  {text: 'Competent After Resubmission', value:'Competent After Resubmission'}
]

export const education = [
  {text: 'Doctoral Degree, PhD', value:'Doctoral Degree, PhD'},
  {text: 'Masters Degree', value:'Masters Degree'},
  {text: '4-year Degree', value:'4-year Degree'},
  {text:'National Diploma and/or Higher Certificate', value: 'National Diploma and/or Higher Certificate'},
  {text:'Grade 12, Matriculation Exemption NTC 4', value:'Grade 12, Matriculation Exemption NTC 4'},
  {text:'Grade 11, NTC 3', value:'Grade 11, NTC 3'},
  {text:'Grade 10, NTC 2', value:'Grade 10, NTC 2'},
  {text:'Grade 9, School Leaving Certificate, NTC 1, ABET level 4', value: 'Grade 9, School Leaving Certificate, NTC 1, ABET level 4'}
]

export const days = [
  {text: '1', value:'1'},
  {text: '2', value:'2'},
  {text: '3', value:'3'},
  {text:'4', value: '4'},
  {text:'5', value:'5'},
  {text:'6', value:'6'},
  {text:'7', value:'7'},
  {text:'8', value: '8'},
  {text:'9', value: '9'},
  {text:'10', value:'10'},
  {text:'11', value: '11'},
  {text:'12', value: '12'},
  {text:'13', value:'13'},
  {text:'14', value: '14'},
  {text:'15', value:'15'},
  {text:'16', value:'16'},
  {text:'17', value:'17'},
  {text:'18', value:'18'},
  {text:'19', value: '19'},
  {text:'20', value:'20'},
  {text:'21', value:'21'},
  {text:'22', value:'22'},
  {text:'23', value:'23'},
  {text:'24', value:'24'},
  {text:'25', value:'25'},
  {text:'26', value:'26'},
  {text:'27', value:'27'},
  {text:'28', value:'28'},
  {text:'29', value:'29'},
  {text:'30', value:'30'},
  {text:'31', value:'31'}
]
  export const months = [
    {text:'January',value: 'January'},
    {text:'February', value: 'February'},
    {text:'March', value:'March'},
    {text:'April', value: 'April'},
    {text:'May', value:'May'},
    {text:'June', value: 'June'},
    {text:'July', value:'July'},
    {text:'August', value: 'August'},
    {text:'September', value:'September'},
    {text:'October', value:'October'},
    {text:'November', value: 'November'},
    {text:'December', value: 'December'}
  ]

export const countryOptions = [
  { key: 'za', value: 'South Africa', flag: 'za', text: 'South Africa' },
  { key: 'af', value: 'Afghanistan', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'Aland Islands', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'Albania', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'Algeria', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'American Samoa', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'Andorra', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'Angola', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'Anguilla', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'Antigua', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'Argentina', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'Armenia', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'Aruba', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'Australia', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'Austria', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'Azerbaijan', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'Bahamas', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'Bahrain', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'Bangladesh', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'Barbados', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'Belarus', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'Belgium', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'Belize', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'Benin', flag: 'bj', text: 'Benin' },
  { key: 'bm', value: 'Bermuda', flag: 'bm', text: 'Bermuda' },
  { key: 'bt', value: 'Bhutan', flag: 'bt', text: 'Bhutan' },
  { key: 'bo', value: 'Bolivia', flag: 'bo', text: 'Bolivia' },
  { key: 'ba', value: 'Bosnia', flag: 'ba', text: 'Bosnia' },
  { key: 'bw', value: 'Botswana', flag: 'bw', text: 'Botswana' },
  { key: 'bv', value: 'Bouvet Island', flag: 'bv', text: 'Bouvet Island' },
  { key: 'br', value: 'Brazil', flag: 'br', text: 'Brazil' },
  { key: 'vg', value: 'British Virgin Islands', flag: 'vg', text: 'British Virgin Islands' },
  { key: 'bn', value: 'Brunei', flag: 'bn', text: 'Brunei' },
  { key: 'bg', value: 'Bulgaria', flag: 'bg', text: 'Bulgaria' },
  { key: 'bf', value: 'Burkina Faso', flag: 'bf', text: 'Burkina Faso' },
  { key: 'bi', value: 'Burundi', flag: 'bi', text: 'Burundi' },
  { key: 'tc', value: 'Caicos Islands', flag: 'tc', text: 'Caicos Islands' },
  { key: 'kh', value: 'Cambodia', flag: 'kh', text: 'Cambodia' },
  { key: 'cm', value: 'Cameroon', flag: 'cm', text: 'Cameroon' },
  { key: 'ca', value: 'Canada', flag: 'ca', text: 'Canada' },
  { key: 'cv', value: 'Cape Verde', flag: 'cv', text: 'Cape Verde' },
  { key: 'ky', value: 'Cayman Islands', flag: 'ky', text: 'Cayman Islands' },
  { key: 'cf', value: 'Central African Republic', flag: 'cf', text: 'Central African Republic' },
  { key: 'td', value: 'Chad', flag: 'td', text: 'Chad' },
  { key: 'cl', value: 'Chile', flag: 'cl', text: 'Chile' },
  { key: 'cn', value: 'China', flag: 'cn', text: 'China' },
  { key: 'cx', value: 'Christmas Island', flag: 'cx', text: 'Christmas Island' },
  { key: 'cc', value: 'Cocos Islands', flag: 'cc', text: 'Cocos Islands' },
  { key: 'co', value: 'Colombia', flag: 'co', text: 'Colombia' },
  { key: 'km', value: 'Comoros', flag: 'km', text: 'Comoros' },
  { key: 'cg', value: 'Congo Brazzaville', flag: 'cg', text: 'Congo Brazzaville' },
  { key: 'cd', value: 'Congo', flag: 'cd', text: 'Congo' },
  { key: 'ck', value: 'Cook Islands', flag: 'ck', text: 'Cook Islands' },
  { key: 'cr', value: 'Costa Rica', flag: 'cr', text: 'Costa Rica' },
  { key: 'ci', value: 'Cote Divoire', flag: 'ci', text: 'Cote Divoire' },
  { key: 'hr', value: 'Croatia', flag: 'hr', text: 'Croatia' },
  { key: 'cu', value: 'Cuba', flag: 'cu', text: 'Cuba' },
  { key: 'cy', value: 'Cyprus', flag: 'cy', text: 'Cyprus' },
  { key: 'cz', value: 'Czech Republic', flag: 'cz', text: 'Czech Republic' },
  { key: 'dk', value: 'Denmark', flag: 'dk', text: 'Denmark' },
  { key: 'dj', value: 'Djibouti', flag: 'dj', text: 'Djibouti' },
  { key: 'dm', value: 'Dominica', flag: 'dm', text: 'Dominica' },
  { key: 'do', value: 'Dominican Republic', flag: 'do', text: 'Dominican Republic' },
  { key: 'ec', value: 'Ecuador', flag: 'ec', text: 'Ecuador' },
  { key: 'eg', value: 'Egypt', flag: 'eg', text: 'Egypt' },
  { key: 'sv', value: 'sv', flag: 'sv', text: 'El Salvador' },
  { key: 'gb', value: 'England', flag: 'gb', text: 'England' },
  { key: 'gq', value: 'Equatorial Guinea', flag: 'gq', text: 'Equatorial Guinea' },
  { key: 'er', value: 'Eritrea', flag: 'er', text: 'Eritrea' },
  { key: 'ee', value: 'Estonia', flag: 'ee', text: 'Estonia' },
  { key: 'et', value: 'Ethiopia', flag: 'et', text: 'Ethiopia' },
  { key: 'eu', value: 'European Union', flag: 'eu', text: 'European Union' },
  { key: 'fk', value: 'Falkland Islands', flag: 'fk', text: 'Falkland Islands' },
  { key: 'fo', value: 'Faroe Islands', flag: 'fo', text: 'Faroe Islands' },
  { key: 'fj', value: 'Fiji', flag: 'fj', text: 'Fiji' },
  { key: 'fi', value: 'Finland', flag: 'fi', text: 'Finland' },
  { key: 'fr', value: 'France', flag: 'fr', text: 'France' },
  { key: 'gf', value: 'French Guiana', flag: 'gf', text: 'French Guiana' },
  { key: 'pf', value: 'French Polynesia', flag: 'pf', text: 'French Polynesia' },
  { key: 'tf', value: 'French Territories', flag: 'tf', text: 'French Territories' },
  { key: 'ga', value: 'Gabon', flag: 'ga', text: 'Gabon' },
  { key: 'gm', value: 'Gambia', flag: 'gm', text: 'Gambia' },
  { key: 'ge', value: 'Georgia', flag: 'ge', text: 'Georgia' },
  { key: 'de', value: 'Germany', flag: 'de', text: 'Germany' },
  { key: 'gh', value: 'Ghana', flag: 'gh', text: 'Ghana' },
  { key: 'gi', value: 'Gibraltar', flag: 'gi', text: 'Gibraltar' },
  { key: 'gr', value: 'Greece', flag: 'gr', text: 'Greece' },
  { key: 'gl', value: 'Greenland', flag: 'gl', text: 'Greenland' },
  { key: 'gd', value: 'Grenada', flag: 'gd', text: 'Grenada' },
  { key: 'gp', value: 'Guadeloupe', flag: 'gp', text: 'Guadeloupe' },
  { key: 'gu', value: 'Guam', flag: 'gu', text: 'Guam' },
  { key: 'gt', value: 'Guatemala', flag: 'gt', text: 'Guatemala' },
  { key: 'gw', value: 'Guinea-Bissau', flag: 'gw', text: 'Guinea-Bissau' },
  { key: 'gn', value: 'Guinea', flag: 'gn', text: 'Guinea' },
  { key: 'gy', value: 'Guyana', flag: 'gy', text: 'Guyana' },
  { key: 'ht', value: 'Haiti', flag: 'ht', text: 'Haiti' },
  { key: 'hm', value: 'Heard Island', flag: 'hm', text: 'Heard Island' },
  { key: 'hn', value: 'Honduras', flag: 'hn', text: 'Honduras' },
  { key: 'hk', value: 'Hong Kong', flag: 'hk', text: 'Hong Kong' },
  { key: 'hu', value: 'Hungary', flag: 'hu', text: 'Hungary' },
  { key: 'is', value: 'Iceland', flag: 'is', text: 'Iceland' },
  { key: 'in', value: 'India', flag: 'in', text: 'India' },
  { key: 'io', value: 'Indian Ocean Territory', flag: 'io', text: 'Indian Ocean Territory' },
  { key: 'id', value: 'Indonesia', flag: 'id', text: 'Indonesia' },
  { key: 'ir', value: 'Iran', flag: 'ir', text: 'Iran' },
  { key: 'iq', value: 'Iraq', flag: 'iq', text: 'Iraq' },
  { key: 'ie', value: 'Ireland', flag: 'ie', text: 'Ireland' },
  { key: 'il', value: 'Israel', flag: 'il', text: 'Israel' },
  { key: 'it', value: 'Italy', flag: 'it', text: 'Italy' },
  { key: 'jm', value: 'Jamaica', flag: 'jm', text: 'Jamaica' },
  { key: 'jp', value: 'Japan', flag: 'jp', text: 'Japan' },
  { key: 'jo', value: 'Jordan', flag: 'jo', text: 'Jordan' },
  { key: 'kz', value: 'Kazakhstan', flag: 'kz', text: 'Kazakhstan' },
  { key: 'ke', value: 'Kenya', flag: 'ke', text: 'Kenya' },
  { key: 'ki', value: 'Kiribati', flag: 'ki', text: 'Kiribati' },
  { key: 'kw', value: 'Kuwait', flag: 'kw', text: 'Kuwait' },
  { key: 'kg', value: 'Kyrgyzstan', flag: 'kg', text: 'Kyrgyzstan' },
  { key: 'la', value: 'Laos', flag: 'la', text: 'Laos' },
  { key: 'lv', value: 'Latvia', flag: 'lv', text: 'Latvia' },
  { key: 'lb', value: 'Lebanon', flag: 'lb', text: 'Lebanon' },
  { key: 'ls', value: 'Lesotho', flag: 'ls', text: 'Lesotho' },
  { key: 'lr', value: 'Liberia', flag: 'lr', text: 'Liberia' },
  { key: 'ly', value: 'Libya', flag: 'ly', text: 'Libya' },
  { key: 'li', value: 'Liechtenstein', flag: 'li', text: 'Liechtenstein' },
  { key: 'lt', value: 'Lithuania', flag: 'lt', text: 'Lithuania' },
  { key: 'lu', value: 'Luxembourg', flag: 'lu', text: 'Luxembourg' },
  { key: 'mo', value: 'Macau', flag: 'mo', text: 'Macau' },
  { key: 'mk', value: 'Macedonia', flag: 'mk', text: 'Macedonia' },
  { key: 'mg', value: 'Madagascar', flag: 'mg', text: 'Madagascar' },
  { key: 'mw', value: 'Malawi', flag: 'mw', text: 'Malawi' },
  { key: 'my', value: 'Malaysia', flag: 'my', text: 'Malaysia' },
  { key: 'mv', value: 'Maldives', flag: 'mv', text: 'Maldives' },
  { key: 'ml', value: 'Mali', flag: 'ml', text: 'Mali' },
  { key: 'mt', value: 'Malta', flag: 'mt', text: 'Malta' },
  { key: 'mh', value: 'Marshall Islands', flag: 'mh', text: 'Marshall Islands' },
  { key: 'mq', value: 'Martinique', flag: 'mq', text: 'Martinique' },
  { key: 'mr', value: 'Mauritania', flag: 'mr', text: 'Mauritania' },
  { key: 'mu', value: 'Mauritius', flag: 'mu', text: 'Mauritius' },
  { key: 'yt', value: 'Mayotte', flag: 'yt', text: 'Mayotte' },
  { key: 'mx', value: 'Mexico', flag: 'mx', text: 'Mexico' },
  { key: 'fm', value: 'Micronesia', flag: 'fm', text: 'Micronesia' },
  { key: 'md', value: 'Moldova', flag: 'md', text: 'Moldova' },
  { key: 'mc', value: 'Monaco', flag: 'mc', text: 'Monaco' },
  { key: 'mn', value: 'Mongolia', flag: 'mn', text: 'Mongolia' },
  { key: 'me', value: 'Montenegro', flag: 'me', text: 'Montenegro' },
  { key: 'ms', value: 'Montserrat', flag: 'ms', text: 'Montserrat' },
  { key: 'ma', value: 'Morocco', flag: 'ma', text: 'Morocco' },
  { key: 'mz', value: 'Mozambique', flag: 'mz', text: 'Mozambique' },
  { key: 'na', value: 'Namibia', flag: 'na', text: 'Namibia' },
  { key: 'nr', value: 'Nauru', flag: 'nr', text: 'Nauru' },
  { key: 'np', value: 'Nepal', flag: 'np', text: 'Nepal' },
  { key: 'an', value: 'Netherlands Antilles', flag: 'an', text: 'Netherlands Antilles' },
  { key: 'nl', value: 'Netherlands', flag: 'nl', text: 'Netherlands' },
  { key: 'nc', value: 'New Caledonia', flag: 'nc', text: 'New Caledonia' },
  { key: 'pg', value: 'New Guinea', flag: 'pg', text: 'New Guinea' },
  { key: 'nz', value: 'New Zealand', flag: 'nz', text: 'New Zealand' },
  { key: 'ni', value: 'Nicaragua', flag: 'ni', text: 'Nicaragua' },
  { key: 'ne', value: 'Niger', flag: 'ne', text: 'Niger' },
  { key: 'ng', value: 'Nigeria', flag: 'ng', text: 'Nigeria' },
  { key: 'nu', value: 'Niue', flag: 'nu', text: 'Niue' },
  { key: 'nf', value: 'Norfolk Island', flag: 'nf', text: 'Norfolk Island' },
  { key: 'kp', value: 'North Korea', flag: 'kp', text: 'North Korea' },
  { key: 'mp', value: 'Northern Mariana Islands', flag: 'mp', text: 'Northern Mariana Islands' },
  { key: 'no', value: 'Norway', flag: 'no', text: 'Norway' },
  { key: 'om', value: 'Oman', flag: 'om', text: 'Oman' },
  { key: 'pk', value: 'Pakistan', flag: 'pk', text: 'Pakistan' },
  { key: 'pw', value: 'Palau', flag: 'pw', text: 'Palau' },
  { key: 'ps', value: 'Palestine', flag: 'ps', text: 'Palestine' },
  { key: 'pa', value: 'Panama', flag: 'pa', text: 'Panama' },
  { key: 'py', value: 'Paraguay', flag: 'py', text: 'Paraguay' },
  { key: 'pe', value: 'Peru', flag: 'pe', text: 'Peru' },
  { key: 'ph', value: 'Philippines', flag: 'ph', text: 'Philippines' },
  { key: 'pn', value: 'Pitcairn Islands', flag: 'pn', text: 'Pitcairn Islands' },
  { key: 'pl', value: 'Poland', flag: 'pl', text: 'Poland' },
  { key: 'pt', value: 'Portugal', flag: 'pt', text: 'Portugal' },
  { key: 'pr', value: 'Puerto Rico', flag: 'pr', text: 'Puerto Rico' },
  { key: 'qa', value: 'Qatar', flag: 'qa', text: 'Qatar' },
  { key: 're', value: 'Reunion', flag: 're', text: 'Reunion' },
  { key: 'ro', value: 'Romania', flag: 'ro', text: 'Romania' },
  { key: 'ru', value: 'Russia', flag: 'ru', text: 'Russia' },
  { key: 'rw', value: 'Rwanda', flag: 'rw', text: 'Rwanda' },
  { key: 'sh', value: 'Saint Helena', flag: 'sh', text: 'Saint Helena' },
  { key: 'kn', value: 'Saint Kitts and Nevis', flag: 'kn', text: 'Saint Kitts and Nevis' },
  { key: 'lc', value: 'Saint Lucia', flag: 'lc', text: 'Saint Lucia' },
  { key: 'pm', value: 'Saint Pierre', flag: 'pm', text: 'Saint Pierre' },
  { key: 'vc', value: 'Saint Vincent', flag: 'vc', text: 'Saint Vincent' },
  { key: 'ws', value: 'Samoa', flag: 'ws', text: 'Samoa' },
  { key: 'sm', value: 'San Marino', flag: 'sm', text: 'San Marino' },
  { key: 'gs', value: 'Sandwich Islands', flag: 'gs', text: 'Sandwich Islands' },
  { key: 'st', value: 'Sao Tome', flag: 'st', text: 'Sao Tome' },
  { key: 'sa', value: 'Saudi Arabia', flag: 'sa', text: 'Saudi Arabia' },
  { key: 'sn', value: 'Senegal', flag: 'sn', text: 'Senegal' },
  { key: 'cs', value: 'Serbia', flag: 'cs', text: 'Serbia' },
  { key: 'rs', value: 'Serbia', flag: 'rs', text: 'Serbia' },
  { key: 'sc', value: 'Seychelles', flag: 'sc', text: 'Seychelles' },
  { key: 'sl', value: 'Sierra Leone', flag: 'sl', text: 'Sierra Leone' },
  { key: 'sg', value: 'Singapore', flag: 'sg', text: 'Singapore' },
  { key: 'sk', value: 'Slovakia', flag: 'sk', text: 'Slovakia' },
  { key: 'si', value: 'Slovenia', flag: 'si', text: 'Slovenia' },
  { key: 'sb', value: 'Solomon Islands', flag: 'sb', text: 'Solomon Islands' },
  { key: 'so', value: 'Somalia', flag: 'so', text: 'Somalia' },
  { key: 'kr', value: 'South Korea', flag: 'kr', text: 'South Korea' },
  { key: 'es', value: 'Spain', flag: 'es', text: 'Spain' },
  { key: 'lk', value: 'Sri Lanka', flag: 'lk', text: 'Sri Lanka' },
  { key: 'sd', value: 'Sudan', flag: 'sd', text: 'Sudan' },
  { key: 'sr', value: 'Suriname', flag: 'sr', text: 'Suriname' },
  { key: 'sj', value: 'Svalbard', flag: 'sj', text: 'Svalbard' },
  { key: 'sz', value: 'Swaziland', flag: 'sz', text: 'Swaziland' },
  { key: 'se', value: 'Sweden', flag: 'se', text: 'Sweden' },
  { key: 'ch', value: 'Switzerland', flag: 'ch', text: 'Switzerland' },
  { key: 'sy', value: 'Syria', flag: 'sy', text: 'Syria' },
  { key: 'tw', value: 'Taiwan', flag: 'tw', text: 'Taiwan' },
  { key: 'tj', value: 'Tajikistan', flag: 'tj', text: 'Tajikistan' },
  { key: 'tz', value: 'Tanzania', flag: 'tz', text: 'Tanzania' },
  { key: 'th', value: 'Thailand', flag: 'th', text: 'Thailand' },
  { key: 'tl', value: 'Timorleste', flag: 'tl', text: 'Timorleste' },
  { key: 'tg', value: 'Togo', flag: 'tg', text: 'Togo' },
  { key: 'tk', value: 'Tokelau', flag: 'tk', text: 'Tokelau' },
  { key: 'to', value: 'Tonga', flag: 'to', text: 'Tonga' },
  { key: 'tt', value: 'Trinidad', flag: 'tt', text: 'Trinidad' },
  { key: 'tn', value: 'Tunisia', flag: 'tn', text: 'Tunisia' },
  { key: 'tr', value: 'Turkey', flag: 'tr', text: 'Turkey' },
  { key: 'tm', value: 'Turkmenistan', flag: 'tm', text: 'Turkmenistan' },
  { key: 'tv', value: 'Tuvalu', flag: 'tv', text: 'Tuvalu' },
  { key: 'ug', value: 'Uganda', flag: 'ug', text: 'Uganda' },
  { key: 'ua', value: 'Ukraine', flag: 'ua', text: 'Ukraine' },
  { key: 'ae', value: 'United Arab Emirates', flag: 'ae', text: 'United Arab Emirates' },
  { key: 'us', value: 'United States', flag: 'us', text: 'United States' },
  { key: 'uy', value: 'Uruguay', flag: 'uy', text: 'Uruguay' },
  { key: 'um', value: 'Us Minor Islands', flag: 'um', text: 'Us Minor Islands' },
  { key: 'vi', value: 'Us Virgin Islands', flag: 'vi', text: 'Us Virgin Islands' },
  { key: 'uz', value: 'Uzbekistan', flag: 'uz', text: 'Uzbekistan' },
  { key: 'vu', value: 'Vanuatu', flag: 'vu', text: 'Vanuatu' },
  { key: 'va', value: 'Vatican City', flag: 'va', text: 'Vatican City' },
  { key: 've', value: 'Venezuela', flag: 've', text: 'Venezuela' },
  { key: 'vn', value: 'Vietnam', flag: 'vn', text: 'Vietnam' },
  { key: 'wf', value: 'Wallis and Futuna', flag: 'wf', text: 'Wallis and Futuna' },
  { key: 'eh', value: 'Western Sahara', flag: 'eh', text: 'Western Sahara' },
  { key: 'ye', value: 'Yemen', flag: 'ye', text: 'Yemen' },
  { key: 'zm', value: 'Zambia', flag: 'zm', text: 'Zambia' },
  { key: 'zw', value: 'Zimbabwe', flag: 'zw', text: 'Zimbabwe' },
]

export const languageOptions = [
  {text: 'Afrikaans', value: 'Afrikaans'},
  {text: 'English', value: 'English'},
  {text: 'Ndebele', value: 'Ndebele'},
  {text: 'Northern Sotho', value: 'Northern Sotho'},
  {text: 'Sepedi', value: 'Sepedi'},
  {text: 'Southern Sotho', value: 'Southern Sotho'},
  {text: 'Swati', value: 'Swati'},
  {text: 'Tsonga', value: 'Tsonga'},
  {text: 'Tswana', value: 'Tswana'},
  {text: 'Venda', value: 'Venda'},
  {text: 'Xhosa', value: 'Xhosa'},
  {text: 'Zulu', value: 'Zulu'}
  // { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
  // { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
  // { key: 'Danish', text: 'Danish', value: 'Danish' },
  // { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
  // { key: 'English', text: 'English', value: 'English' },
  // { key: 'French', text: 'French', value: 'French' },
  // { key: 'German', text: 'German', value: 'German' },
  // { key: 'Greek', text: 'Greek', value: 'Greek' },
  // { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
  // { key: 'Italian', text: 'Italian', value: 'Italian' },
  // { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
  // { key: 'Korean', text: 'Korean', value: 'Korean' },
  // { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
  // { key: 'Persian', text: 'Persian', value: 'Persian' },
  // { key: 'Polish', text: 'Polish', value: 'Polish' },
  // { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
  // { key: 'Russian', text: 'Russian', value: 'Russian' },
  // { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  // { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
  // { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
  // { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
]
export const EquityOptions = [
  {text: 'African',value: 'African'},
  {text: 'Coloured',value: 'Coloured'},
  {text: 'Indian',value: 'Indian'},
  {text: 'White',value: 'White'},
  {text: 'Other',value: 'Other'}
]
export const genderOptions = [
  {text: 'Male', value: 'Male'},
  {text: 'Female', value: 'Female'},
  {text: 'Unknown', value: 'Unknown'}
]

export const disability = [
  {text: '01 Behaviour and Emotional', value:'01 Behaviour and Emotional'},
  {text: '02 Hearing', value:'02 Hearing'},
  {text: '03 Manual Dexterity', value:'03 Manual Dexterity'},
  {text:'04 Memory or ability to concentrate, learn or understand (learning disablity)', value: '04 Memory or ability to concentrate, learn or understand (learning disablity)'},
  {text:'05 Mobility and Gross Motor', value:'05 Mobility and Gross Motor'},
  {text:'06 Perception of Physical Danger', value:'06 Perception of Physical Danger'},
  {text:'07 Personal, Self-Care and Continence', value:'07 Personal, Self-Care and Continence'},
  {text:'08 Progressive Conditions and Physical Health (such as HIV, cancer, multiple sclerosis, fits etc)', value: '08 Progressive Conditions and Physical Health (such as HIV, cancer, multiple sclerosis, fits etc)'},
  {text:'09 Sight', value: '09 Sight'},
  {text:'10 Speech', value:'10 Speech'},
  {text:'XX Other', value: 'XX Other'},
  {text:'NN No disability', value: 'NN No disability'},
  {text:'ZZ Not Stated (Person asked but declined to provide a response)', value:'ZZ Not Stated (Person asked but declined to provide a response)'}
]

export const yesNoOption = [
  {text: 'Yes', value: 'Yes'},
  {text: 'No', value: 'No'}
]

export const titleOptions = [
  {text: 'Dr', value: 'Dr'},
  {text: 'Prof', value: 'Prof'},
  {text:'Mr', value: 'Mr'},
  {text: 'Mrs', value: 'Mrs'},
  {text: 'Miss', value: 'Miss'},
  {text: 'Ms', value: 'Ms'}
]
export const courseOptions = [
  {text: 'Qualification', value: "Qualification"},
  {text: 'Learnership', value: 'Learnership'},
  {text: 'Skills Programme', value: 'Skills Programme'},
  {text: 'Unit standard', value: 'Unit standard'},
  {text: 'Short Course', value: 'Short Course'}
]

export const tagOptions = [
  {
    key: 'Important',
    text: 'Important',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'Announcement',
    text: 'Announcement',
    value: 'Announcement',
    label: { color: 'blue', empty: true, circular: true },
  },
  {
    key: 'Cannot Fix',
    text: 'Cannot Fix',
    value: 'Cannot Fix',
    label: { color: 'black', empty: true, circular: true },
  },
  {
    key: 'News',
    text: 'News',
    value: 'News',
    label: { color: 'purple', empty: true, circular: true },
  },
  {
    key: 'Enhancement',
    text: 'Enhancement',
    value: 'Enhancement',
    label: { color: 'orange', empty: true, circular: true },
  },
  {
    key: 'Change Declined',
    text: 'Change Declined',
    value: 'Change Declined',
    label: { empty: true, circular: true },
  },
  {
    key: 'Off Topic',
    text: 'Off Topic',
    value: 'Off Topic',
    label: { color: 'yellow', empty: true, circular: true },
  },
  {
    key: 'Interesting',
    text: 'Interesting',
    value: 'Interesting',
    label: { color: 'pink', empty: true, circular: true },
  },
  {
    key: 'Discussion',
    text: 'Discussion',
    value: 'Discussion',
    label: { color: 'green', empty: true, circular: true },
  },
]

export const getOptions = (number, prefix = 'Choice ') =>
  _.times(number, index => ({
    key: index,
    text: `${prefix}${index}`,
    value: index,
  }))
