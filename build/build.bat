@echo off
set PATH=\
echo Running jsHint
C:\Windows\System32\cscript.exe jsHint\wsh.js ..\src\jsLINQ.js
echo Running ajaxMin
minify\ajaxmin ..\src\jsLINQ.js -o ..\jslinq.min.js -clobber
echo building nuget package
copy ..\jslinq.min.js ".nuget\content\Scripts"
copy ..\src\jsLINQ.js ".nuget\content\Scripts"
.nuget\NuGet Pack .nuget\jsLINQ.js.nuspec -OutputDirectory .nuget\
echo ----------------------------------------------
