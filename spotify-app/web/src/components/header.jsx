import React from 'react';

import spoootify from '../images/spoootify.png'

// components
import LoginButton from './loginbutton.jsx';

// default profile image
import defaultUserImage from '../images/defaultUserProfileImage.jpg';

function Header({loggedIn, userData}) {
    const authStatus = loggedIn;
    const userProfileData = userData;
    return (
        <div className="flex flex-col bg-slate-900 px-4 py-2 text-white">
            <div className="flex items-center justify-between">
                {/* Left Aligned */}
                <div className="flex items-center">
                    <img src={spoootify} alt="Spoootify Logo" className="h-24 w-24"></img>
                </div>
                {/* Right Aligned */}
            <UserGreeting status={authStatus} user={userProfileData}/>
            </div>
        </div>
    );
}

function UserGreeting({status, user}) {
    if (status && user) {
        return (
        <div className="flex flex-row items-end">
        <h1>Hello {user.display_name}!&nbsp;&nbsp;&nbsp;</h1>
        <FlagEmoji countryCode={user.country}/>&nbsp;&nbsp;&nbsp;
        {user?.images?.[0]?.url ? (
            <img src={user.images[0].url} alt="User Profile" className="h-8 w-8 rounded-full"></img>
        ) : (
            <img src={defaultUserImage} alt="User Profile" className="h-8 w-8 rounded-full"></img>
        )}
        </div>
        );
    } else {
        return <LoginButton displayText="Log In"/>;
    }
}

function FlagEmoji({countryCode}) {
    const countryFlags = {
        'AF': '🇦🇫', // Afghanistan
        'AX': '🇦🇽', // Åland Islands
        'AL': '🇦🇱', // Albania
        'DZ': '🇩🇿', // Algeria
        'AS': '🇦🇸', // American Samoa
        'AD': '🇦🇩', // Andorra
        'AO': '🇦🇴', // Angola
        'AI': '🇦🇮', // Anguilla
        'AQ': '🇦🇶', // Antarctica
        'AG': '🇦🇬', // Antigua and Barbuda
        'AR': '🇦🇷', // Argentina
        'AM': '🇦🇲', // Armenia
        'AW': '🇦🇼', // Aruba
        'AU': '🇦🇺', // Australia
        'AT': '🇦🇹', // Austria
        'AZ': '🇦🇿', // Azerbaijan
        'BS': '🇧🇸', // Bahamas
        'BH': '🇧🇭', // Bahrain
        'BD': '🇧🇩', // Bangladesh
        'BB': '🇧🇧', // Barbados
        'BY': '🇧🇾', // Belarus
        'BE': '🇧🇪', // Belgium
        'BZ': '🇧🇿', // Belize
        'BJ': '🇧🇯', // Benin
        'BM': '🇧🇲', // Bermuda
        'BT': '🇧🇹', // Bhutan
        'BO': '🇧🇴', // Bolivia
        'BQ': '🇧🇶', // Bonaire, Sint Eustatius and Saba
        'BA': '🇧🇦', // Bosnia and Herzegovina
        'BW': '🇧🇼', // Botswana
        'BV': '🇧🇻', // Bouvet Island
        'BR': '🇧🇷', // Brazil
        'IO': '🇮🇴', // British Indian Ocean Territory
        'BN': '🇧🇳', // Brunei Darussalam
        'BG': '🇧🇬', // Bulgaria
        'BF': '🇧🇫', // Burkina Faso
        'BI': '🇧🇮', // Burundi
        'CV': '🇨🇻', // Cabo Verde
        'KH': '🇰🇭', // Cambodia
        'CM': '🇨🇲', // Cameroon
        'CA': '🇨🇦', // Canada
        'KY': '🇰🇾', // Cayman Islands
        'CF': '🇨🇫', // Central African Republic
        'TD': '🇹🇩', // Chad
        'CL': '🇨🇱', // Chile
        'CN': '🇨🇳', // China
        'CX': '🇨🇽', // Christmas Island
        'CC': '🇨🇨', // Cocos (Keeling) Islands
        'CO': '🇨🇴', // Colombia
        'KM': '🇰🇲', // Comoros
        'CD': '🇨🇩', // Congo, Democratic Republic of the
        'CG': '🇨🇬', // Congo
        'CK': '🇨🇰', // Cook Islands
        'CR': '🇨🇷', // Costa Rica
        'CI': '🇨🇮', // Côte d'Ivoire
        'HR': '🇭🇷', // Croatia
        'CU': '🇨🇺', // Cuba
        'CW': '🇨🇼', // Curaçao
        'CY': '🇨🇾', // Cyprus
        'CZ': '🇨🇿', // Czechia
        'DK': '🇩🇰', // Denmark
        'DJ': '🇩🇯', // Djibouti
        'DM': '🇩🇲', // Dominica
        'DO': '🇩🇴', // Dominican Republic
        'EC': '🇪🇨', // Ecuador
        'EG': '🇪🇬', // Egypt
        'SV': '🇸🇻', // El Salvador
        'GQ': '🇬🇶', // Equatorial Guinea
        'ER': '🇪🇷', // Eritrea
        'EE': '🇪🇪', // Estonia
        'SZ': '🇸🇿', // Eswatini
        'ET': '🇪🇹', // Ethiopia
        'FK': '🇫🇰', // Falkland Islands (Malvinas)
        'FO': '🇫🇴', // Faroe Islands
        'FJ': '🇫🇯', // Fiji
        'FI': '🇫🇮', // Finland
        'FR': '🇫🇷', // France
        'GF': '🇬🇫', // French Guiana
        'PF': '🇵🇫', // French Polynesia
        'TF': '🇹🇫', // French Southern Territories
        'GA': '🇬🇦', // Gabon
        'GM': '🇬🇲', // Gambia
        'GE': '🇬🇪', // Georgia
        'DE': '🇩🇪', // Germany
        'GH': '🇬🇭', // Ghana
        'GI': '🇬🇮', // Gibraltar
        'GR': '🇬🇷', // Greece
        'GL': '🇬🇱', // Greenland
        'GD': '🇬🇩', // Grenada
        'GP': '🇬🇵', // Guadeloupe
        'GU': '🇬🇺', // Guam
        'GT': '🇬🇹', // Guatemala
        'GG': '🇬🇬', // Guernsey
        'GN': '🇬🇳', // Guinea
        'GW': '🇬🇼', // Guinea-Bissau
        'GY': '🇬🇾', // Guyana
        'HT': '🇭🇹', // Haiti
        'HM': '🇭🇲', // Heard Island and McDonald Islands
        'VA': '🇻🇦', // Holy See
        'HN': '🇭🇳', // Honduras
        'HK': '🇭🇰', // Hong Kong
        'HU': '🇭🇺', // Hungary
        'IS': '🇮🇸', // Iceland
        'IN': '🇮🇳', // India
        'ID': '🇮🇩', // Indonesia
        'IR': '🇮🇷', // Iran
        'IQ': '🇮🇶', // Iraq
        'IE': '🇮🇪', // Ireland
        'IM': '🇮🇲', // Isle of Man
        'IL': '🇮🇱', // Israel
        'IT': '🇮🇹', // Italy
        'JM': '🇯🇲', // Jamaica
        'JP': '🇯🇵', // Japan
        'JE': '🇯🇪', // Jersey
        'JO': '🇯🇴', // Jordan
        'KZ': '🇰🇿', // Kazakhstan
        'KE': '🇰🇪', // Kenya
        'KI': '🇰🇮', // Kiribati
        'KP': '🇰🇵', // Korea, Democratic People's Republic of
        'KR': '🇰🇷', // Korea, Republic of
        'KW': '🇰🇼', // Kuwait
        'KG': '🇰🇬', // Kyrgyzstan
        'LA': '🇱🇦', // Lao People's Democratic Republic
        'LV': '🇱🇻', // Latvia
        'LB': '🇱🇧', // Lebanon
        'LS': '🇱🇸', // Lesotho
        'LR': '🇱🇷', // Liberia
        'LY': '🇱🇾', // Libya
        'LI': '🇱🇮', // Liechtenstein
        'LT': '🇱🇹', // Lithuania
        'LU': '🇱🇺', // Luxembourg
        'MO': '🇲🇴', // Macao
        'MG': '🇲🇬', // Madagascar
        'MW': '🇲🇼', // Malawi
        'MY': '🇲🇾', // Malaysia
        'MV': '🇲🇻', // Maldives
        'ML': '🇲🇱', // Mali
        'MT': '🇲🇹', // Malta
        'MH': '🇲🇭', // Marshall Islands
        'MQ': '🇲🇶', // Martinique
        'MR': '🇲🇷', // Mauritania
        'MU': '🇲🇺', // Mauritius
        'YT': '🇾🇹', // Mayotte
        'MX': '🇲🇽', // Mexico
        'FM': '🇫🇲', // Micronesia
        'MD': '🇲🇩', // Moldova
        'MC': '🇲🇨', // Monaco
        'MN': '🇲🇳', // Mongolia
        'ME': '🇲🇪', // Montenegro
        'MS': '🇲🇸', // Montserrat
        'MA': '🇲🇦', // Morocco
        'MZ': '🇲🇿', // Mozambique
        'MM': '🇲🇲', // Myanmar
        'NA': '🇳🇦', // Namibia
        'NR': '🇳🇷', // Nauru
        'NP': '🇳🇵', // Nepal
        'NL': '🇳🇱', // Netherlands
        'NC': '🇳🇨', // New Caledonia
        'NZ': '🇳🇿', // New Zealand
        'NI': '🇳🇮', // Nicaragua
        'NE': '🇳🇪', // Niger
        'NG': '🇳🇬', // Nigeria
        'NU': '🇳🇺', // Niue
        'NF': '🇳🇫', // Norfolk Island
        'MK': '🇲🇰', // North Macedonia
        'MP': '🇲🇵', // Northern Mariana Islands
        'NO': '🇳🇴', // Norway
        'OM': '🇴🇲', // Oman
        'PK': '🇵🇰', // Pakistan
        'PW': '🇵🇼', // Palau
        'PS': '🇵🇸', // Palestine, State of
        'PA': '🇵🇦', // Panama
        'PG': '🇵🇬', // Papua New Guinea
        'PY': '🇵🇾', // Paraguay
        'PE': '🇵🇪', // Peru
        'PH': '🇵🇭', // Philippines
        'PN': '🇵🇳', // Pitcairn
        'PL': '🇵🇱', // Poland
        'PT': '🇵🇹', // Portugal
        'PR': '🇵🇷', // Puerto Rico
        'QA': '🇶🇦', // Qatar
        'RE': '🇷🇪', // Réunion
        'RO': '🇷🇴', // Romania
        'RU': '🇷🇺', // Russian Federation
        'RW': '🇷🇼', // Rwanda
        'BL': '🇧🇱', // Saint Barthélemy
        'SH': '🇸🇭', // Saint Helena, Ascension and Tristan da Cunha
        'KN': '🇰🇳', // Saint Kitts and Nevis
        'LC': '🇱🇨', // Saint Lucia
        'MF': '🇲🇫', // Saint Martin (French part)
        'PM': '🇵🇲', // Saint Pierre and Miquelon
        'VC': '🇻🇨', // Saint Vincent and the Grenadines
        'WS': '🇼🇸', // Samoa
        'SM': '🇸🇲', // San Marino
        'ST': '🇸🇹', // Sao Tome and Principe
        'SA': '🇸🇦', // Saudi Arabia
        'SN': '🇸🇳', // Senegal
        'RS': '🇷🇸', // Serbia
        'SC': '🇸🇨', // Seychelles
        'SL': '🇸🇱', // Sierra Leone
        'SG': '🇸🇬', // Singapore
        'SX': '🇸🇽', // Sint Maarten (Dutch part)
        'SK': '🇸🇰', // Slovakia
        'SI': '🇸🇮', // Slovenia
        'SB': '🇸🇧', // Solomon Islands
        'SO': '🇸🇴', // Somalia
        'ZA': '🇿🇦', // South Africa
        'GS': '🇬🇸', // South Georgia and the South Sandwich Islands
        'SS': '🇸🇸', // South Sudan
        'ES': '🇪🇸', // Spain
        'LK': '🇱🇰', // Sri Lanka
        'SD': '🇸🇩', // Sudan
        'SR': '🇸🇷', // Suriname
        'SJ': '🇸🇯', // Svalbard and Jan Mayen
        'SE': '🇸🇪', // Sweden
        'CH': '🇨🇭', // Switzerland
        'SY': '🇸🇾', // Syrian Arab Republic
        'TW': '🇹🇼', // Taiwan
        'TJ': '🇹🇯', // Tajikistan
        'TZ': '🇹🇿', // Tanzania
        'TH': '🇹🇭', // Thailand
        'TL': '🇹🇱', // Timor-Leste
        'TG': '🇹🇬', // Togo
        'TK': '🇹🇰', // Tokelau
        'TO': '🇹🇴', // Tonga
        'TT': '🇹🇹', // Trinidad and Tobago
        'TN': '🇹🇳', // Tunisia
        'TR': '🇹🇷', // Turkey
        'TM': '🇹🇲', // Turkmenistan
        'TC': '🇹🇨', // Turks and Caicos Islands
        'TV': '🇹🇻', // Tuvalu
        'UG': '🇺🇬', // Uganda
        'UA': '🇺🇦', // Ukraine
        'AE': '🇦🇪', // United Arab Emirates
        'GB': '🇬🇧', // United Kingdom
        'UM': '🇺🇲', // United States Minor Outlying Islands
        'US': '🇺🇸', // United States of America
        'UY': '🇺🇾', // Uruguay
        'UZ': '🇺🇿', // Uzbekistan
        'VU': '🇻🇺', // Vanuatu
        'VE': '🇻🇪', // Venezuela
        'VN': '🇻🇳', // Viet Nam
        'VG': '🇻🇬', // Virgin Islands (British)
        'VI': '🇻🇮', // Virgin Islands (U.S.)
        'WF': '🇼🇫', // Wallis and Futuna
        'EH': '🇪🇭', // Western Sahara
        'YE': '🇾🇪', // Yemen
        'ZM': '🇿🇲', // Zambia
        'ZW': '🇿🇼', // Zimbabwe
    };

    const flag = countryFlags[countryCode];
    return flag;
}


export default Header;