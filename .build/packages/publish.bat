@ECHO OFF

set key1=Bridge

SET /p proceed=Are you sure? [y] or [n]
SET /p apikey=NuGet API Key?
SET /p version=Release version number?

IF "%proceed%"=="y" (
	:: This process will take a long time to run
	..\..\.nuget\NuGet.exe push %key1%.%version%.nupkg  %apikey%
	ECHO DONE!
)

PAUSE