// Assignment Code
var generateBtn = document.querySelector("#generate");

// Let's keep track of how many passwords are created:
var iTotalPasswordsCreated = 0;

// lowercase, uppercase, numeric, special characters
var iUseLowercaseIdx=0, 
    iUseUppercaseIdx=1,
    iUseNumbersIdx=2,
    iUseSpecCharsIdx=3;
var aUserPwdReqs = [ true, true, true, true ];
var aPwdReqTypes = [ "lowercase", "uppercase", "numeric", "special" ];
var iUserPwdLen = 0;

function ClearUserPasswordRequirements() {
  for( var i=0; i < aUserPwdReqs.length; i++ ) {
    aUserPwdReqs[i] = false;
  }
  iUserPwdLen = 0;
}

function LogUserPasswordRequirements() {
  console.log( "User specified password requirements:" );
  console.log( "   Length: " + iUserPwdLen );
  for( var i=0; ( i < aUserPwdReqs.length); i++ ) {
    console.log( "   Use " + aPwdReqTypes[i] + " characters: " + aUserPwdReqs[i] );
  }
}

function GetPasswordRequirements() {
  var sPwdType = "?";
  var sUserResponse = "?";
  var bIsValid = false;
  
  // Let's start with a clean slate before gathering the new requirements:
  ClearUserPasswordRequirements();
  
  // Keep asking for the length of the password to generate
  // until such time the user provides a proper number:
  bIsValid = false;
  while( !bIsValid ) {
    var iPwdLen = prompt( "Please specify the length of the new password [8..128]" );
    bIsValid = ( (iPwdLen >= 8) && (iPwdLen <=128) );
    if ( bIsValid )
      iUserPwdLen = iPwdLen;
    else {
      alert( "The password length must be within the range of: [8..128]!" );
    }
  }
  
  // Keep asking for yes/no requirements until a minimum of 1 is obtained:
  bIsValid = false;
  while( !bIsValid )
  {
    for( var iReqNo=0; (iReqNo < aUserPwdReqs.length); ) {
      
      sUserResponse = prompt( "Use " + aPwdReqTypes[iReqNo] + " characters in the new password [Yes/No]?" );
      if ( !sUserResponse ) {
        bIsValid = false;
      }
      else {
        sUserResponse = sUserResponse.toLowerCase();
        sUserResponse = sUserResponse.substr(0,1);
        if ( sUserResponse == 'y' ) {
          bIsValid = true;
          aUserPwdReqs[iReqNo] = true;
        } else if ( sUserResponse == 'n' ) {
          bIsValid = true;
          //aUserPwdReqs[iReqNo] = false;
        }
      }
      
      if ( bIsValid ) {
        iReqNo++;
      } else {
        alert( "Please specify either [Y]es or [N]o to the question!" );
      }
      
    } // endFor

    // Verify that at least 1 of the character types is required:
    bIsValid = false;
    for( var i=0; (!bIsValid) && (i < aUserPwdReqs.length); i++ ) {
      if ( aUserPwdReqs[i] )
        bIsValid = true;
    }

    if ( !bIsValid ) {
      alert( "You must specify at least 1 character type to use for the new password!" );
    }
    
  } // endWhile  
  
}

function getRandomInt(max) {
  // This function always returns a positive integer value between 0 and max-1,
  // therefore adjust the max if necessary:
  var iRandomFloorValue=0;
  var nRandomValue=0;
  if ( max < 0 ) {
    max = ( max * -1 );
  }
  if ( max > 1 ) {
    nRandomValue = Math.random( max );
    iRandomFloorValue = Math.floor( nRandomValue * Math.floor(max) );
  }
  console.log( "Random number generated is [", nRandomValue, "] with a floor(" + max + ") generated of: [", iRandomFloorValue, "]" );
  return( iRandomFloorValue );
}

function generatePassword() {
  iTotalPasswordsCreated++;
  var sNewPwd = "";
  
  var sLowerCase = "abcdefghijklmnopqrstuvwxyz";
  var sUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var sNumbers = "0123456789";
  var sSpecialChars = " !@#$%^&'()*-+=~`,./:;<>?[]_{|}\"\\"; // plus: 0x22:" 0x5C:\
  var iNextPwdReqIdx = 0;
  var iMaxPwdReqs = aUserPwdReqs.length;
  
  while( sNewPwd.length < iUserPwdLen ) {
    
    for( var i=0; (i < iMaxPwdReqs); i++ )
    {
      var iIdx=iNextPwdReqIdx;
      
      // Prepare for the next character type to generate:
      iNextPwdReqIdx++;
      if ( iNextPwdReqIdx >= iMaxPwdReqs )
         iNextPwdReqIdx = 0;
      
      if ( (sNewPwd.length < iUserPwdLen) && aUserPwdReqs[iIdx] ) {
        // Found a character type to generate!
        sPwdCharacters = "?";
        if ( iIdx == iUseLowercaseIdx ) {
          sPwdCharacters = sLowerCase;
        } else if ( iIdx == iUseUppercaseIdx ) {
          sPwdCharacters = sUpperCase;
        } else if ( iIdx == iUseNumbersIdx ) {
          sPwdCharacters = sNumbers;
        } else if ( iIdx == iUseSpecCharsIdx ) {
          sPwdCharacters = sSpecialChars;
        }
        
        if ( sPwdCharacters != "?" ) {
          var iPwdCharIdx = getRandomInt( sPwdCharacters.length );
          var cPwdChar = sPwdCharacters.substr(iPwdCharIdx,1);
          sNewPwd = sNewPwd + cPwdChar;
        }
        
      }
      
    }
    
  } // endWhile( sNewPwd.length < iUserPwdLen )
  
  return sNewPwd;
}

// Write password to the #password input
function writePassword() {
  
  GetPasswordRequirements();
  LogUserPasswordRequirements();
  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  //console.log( "passwordText: " + passwordText.tagName );
  console.log( "Password generated: [" + password + "]" );
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
